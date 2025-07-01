import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL bağlantı konfigürasyonu
const dbConfig = {
  host: '91.132.49.7',
  user: 'root',
  password: 'uBnmugXQRzwDOuk',
  database: 'server',
  port: 3306
};

let connection;

async function connectDB() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('MySQL veritabanına başarıyla bağlandı');
    
    // Veritabanı yapısını kontrol et
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('Mevcut tablolar:', tables.map(t => Object.values(t)[0]));
    
    // Users tablosunun yapısını kontrol et
    const [columns] = await connection.execute('DESCRIBE user_entity');
    console.log('user_entity tablosu yapısı:', columns);
    
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
    process.exit(1);
  }
}

app.get('/api/db-info', async (req, res) => {
  try {
    const [tables] = await connection.execute('SHOW TABLES');
    const [usersColumns] = await connection.execute('DESCRIBE user_entity');
    
    res.json({
      success: true,
      tables: tables.map(t => Object.values(t)[0]),
      usersTable: usersColumns
    });
  } catch (error) {
    console.error('Veritabanı bilgisi hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Veritabanı bilgisi alınamadı' 
    });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Kullanıcı adı ve şifre gerekli' 
      });
    }

    const [accountRows] = await connection.execute(
      'SELECT * FROM account_entity WHERE login = ?',
      [username]
    );

    if (accountRows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Kullanıcı adı veya şifre hatalı' 
      });
    }

    const account = accountRows[0];

    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const isValidPassword = (hash === account.password);

    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Kullanıcı adı veya şifre hatalı' 
      });
    }

    const [userRows] = await connection.execute(
      'SELECT * FROM user_entity WHERE accountId = ?',
      [account.id]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kullanıcı bilgileri bulunamadı' 
      });
    }

    const user = userRows[0];
    const userData = {
      id: user.id,
      username: account.login,
      characterName: user.rp_name || account.login,
      level: user.level || 1,
      experience: user.exp || 0,
      nextLevelExp: user.next_level_exp || 1000,
      money: user.money || 0,
      bank: user.bank_money || 0,
      job: user.job || 'İşsiz',
      faction: user.fraction || 'Factionsız',
      playTime: user.played_time || 0,
      joinDate: user.date_reg || 'Yeni',
      lastSeen: user.date_auth || 'Şimdi',
      reputation: user.reputation || 0,
      avatar: user.avatar || '/api/placeholder/100/100'
    };

    res.json({
      success: true,
      message: 'Giriş başarılı',
      user: userData
    });

  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası' 
    });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await connection.execute(
      'SELECT * FROM user_entity WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı' 
      });
    }

    const user = rows[0];
    const userData = {
      id: user.id,
      username: user.name,
      characterName: user.character_name || user.name,
      level: user.level || 1,
      experience: user.experience || 0,
      nextLevelExp: user.next_level_exp || 1000,
      money: user.money || 0,
      bank: user.bank || 0,
      job: user.job || 'İşsiz',
      faction: user.faction || 'Factionsız',
      playTime: user.play_time || '0 saat',
      joinDate: user.join_date || 'Yeni',
      lastSeen: user.last_seen || 'Şimdi',
      reputation: user.reputation || 0,
      avatar: user.avatar || '/api/placeholder/100/100'
    };

    res.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Kullanıcı bilgileri getirme hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası' 
    });
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Güncellenebilir alanları kontrol et
    const allowedFields = [
      'character_name', 'level', 'experience', 'next_level_exp',
      'money', 'bank', 'job', 'faction', 'play_time', 'reputation', 'avatar'
    ];

    const updateFields = [];
    const updateValues = [];

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        updateValues.push(updateData[field]);
      }
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Güncellenecek alan bulunamadı' 
      });
    }

    updateValues.push(userId);

    const [result] = await connection.execute(
      `UPDATE user_entity SET ${updateFields.join(', ')}, last_seen = NOW() WHERE id = ?`,
      updateValues
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı' 
      });
    }

    res.json({
      success: true,
      message: 'Kullanıcı bilgileri güncellendi'
    });

  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası' 
    });
  }
});

app.get('/api/user/:id/vehicles', async (req, res) => {
  try {
    const userId = req.params.id;

    // Önce user_entity'den kullanıcıyı bul
    const [userRows] = await connection.execute(
      'SELECT * FROM user_entity WHERE id = ?',
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı' 
      });
    }

    const user = userRows[0];

    const [vehicleRows] = await connection.execute(
      'SELECT * FROM vehicle_entity WHERE userId = ?',
      [user.id]
    );

    const vehicles = await Promise.all(vehicleRows.map(async (vehicle) => {
      let vehicleName = 'Bilinmeyen Araç';
      
      if (vehicle.model) {
        try {
          const [configRows] = await connection.execute(
            'SELECT name FROM vehicle_configs_entity WHERE model = ?',
            [vehicle.model]
          );
          
          if (configRows.length > 0) {
            vehicleName = configRows[0].name;
          }
        } catch (error) {
          console.error('Araç adı getirme hatası:', error);
        }
      }

      return {
        id: vehicle.id,
        name: vehicleName,
        plate: vehicle.number || 'PLAKA YOK',
        fuel: vehicle.fuel || 100,
        condition: vehicle.condition || 'Mükemmel',
        model: vehicle.model || 'Unknown'
      };
    }));

    res.json({
      success: true,
      vehicles: vehicles
    });

  } catch (error) {
    console.error('Araç getirme hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası' 
    });
  }
});

app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'Sunucu çalışıyor',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/debug/user/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // account_entity'den kullanıcıyı bul
    const [accountRows] = await connection.execute(
      'SELECT * FROM account_entity WHERE login = ?',
      [username]
    );

    if (accountRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı' 
      });
    }

    const account = accountRows[0];

    // user_entity'den kullanıcı bilgilerini çek
    const [userRows] = await connection.execute(
      'SELECT * FROM user_entity WHERE accountId = ?',
      [account.id]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kullanıcı bilgileri bulunamadı' 
      });
    }

    const user = userRows[0];

    res.json({
      success: true,
      account: account,
      user: user,
      processedData: {
        id: user.id,
        username: account.login,
        money: user.money,
        bank_money: user.bank_money,
        level: user.level,
        online: user.online
      }
    });

  } catch (error) {
    console.error('Debug hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası' 
    });
  }
});

app.get('/api/user/:id/houses', async (req, res) => {
  try {
    const userId = req.params.id;

    // Önce user_entity'den kullanıcıyı bul
    const [userRows] = await connection.execute(
      'SELECT * FROM user_entity WHERE id = ?',
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı' 
      });
    }

    const user = userRows[0];

    const [houseRows] = await connection.execute(
      'SELECT * FROM house_entity WHERE userId = ?',
      [user.id]
    );

    const houses = houseRows.map(house => ({
      id: house.id,
      name: house.name || 'Ev',
      type: house.type || 'Konut',
      value: house.price || 0,
      status: 'Sahip',
      location: house.location || 'Bilinmeyen Konum',
      size: house.size || 'Standart'
    }));

    res.json({
      success: true,
      houses: houses
    });

  } catch (error) {
    console.error('Ev getirme hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası' 
    });
  }
});

app.post('/api/shopier/callback', async (req, res) => {
  try {
    const {
      orderId,
      status,
      signature,
      amount,
      currency,
      paymentMethod,
      errorCode,
      errorMessage,
      timestamp
    } = req.body;

    console.log('Shopier callback alındı:', {
      orderId,
      status,
      amount,
      currency,
      paymentMethod,
      errorCode,
      timestamp
    });

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Eksik parametreler'
      });
    }

    // Shopier signature doğrulaması (gerçek implementasyonda yapılmalı)
    // const isValidSignature = verifyShopierSignature(signature, orderId, amount);
    // if (!isValidSignature) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Geçersiz imza'
    //   });
    // }

    // Ödeme durumuna göre işlem yap
    if (status === 'success') {
      // Başarılı ödeme - kullanıcıya paket ver
      try {
        // Burada kullanıcıya paket verilir
        // Örnek: user_entity tablosunda para ekleme, VIP verilmesi vb.
        
        console.log(`Başarılı ödeme: ${orderId} - ${amount} ${currency}`);
        
        // Ödeme kaydını veritabanına ekle (isteğe bağlı)
        // await connection.execute(
        //   'INSERT INTO payments (order_id, user_id, amount, currency, status, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        //   [orderId, userId, amount, currency, 'success', new Date()]
        // );

        res.json({
          success: true,
          message: 'Ödeme başarıyla işlendi'
        });
      } catch (error) {
        console.error('Ödeme işleme hatası:', error);
        res.status(500).json({
          success: false,
          message: 'Ödeme işlenirken hata oluştu'
        });
      }
    } else {
      // Başarısız ödeme
      console.log(`Başarısız ödeme: ${orderId} - Hata: ${errorCode} - ${errorMessage}`);
      
      res.json({
        success: false,
        message: errorMessage || 'Ödeme başarısız'
      });
    }

  } catch (error) {
    console.error('Shopier callback hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
});

// vehicle_entity tablosu yapısını kontrol et endpoint'i
app.get('/api/debug/vehicle-structure', async (req, res) => {
  try {
    const [columns] = await connection.execute('DESCRIBE vehicle_entity');
    
    res.json({
      success: true,
      vehicleTable: columns
    });
  } catch (error) {
    console.error('Vehicle tablosu yapısı hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Vehicle tablosu yapısı alınamadı' 
    });
  }
});

// Sunucuyu başlat
async function startServer() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
  });
}

startServer().catch(console.error); 