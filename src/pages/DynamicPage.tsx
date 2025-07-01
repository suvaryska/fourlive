import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPage = () => {
      const savedPages = localStorage.getItem('customPages');
      if (savedPages) {
        const pages: Page[] = JSON.parse(savedPages);
        const foundPage = pages.find(p => p.slug === slug && p.status === 'published');
        
        if (foundPage) {
          setPage(foundPage);
          // Set page title
          document.title = `${foundPage.title} - Los Santos RP`;
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Sayfa yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <FileText className="h-16 w-16 text-gray-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Sayfa Bulunamadı</h2>
          <p className="text-gray-400 mb-8">
            Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div 
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
};

export default DynamicPage;