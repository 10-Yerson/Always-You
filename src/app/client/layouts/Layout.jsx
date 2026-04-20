
import { Heart } from 'lucide-react';
import UserPanel from "../components/siderbar";
import ProtectedRoute from "@/protected/ProtectedRoute";


const ContentLoading = () => (
  <div className="flex items-center justify-center h-full min-h-[400px] w-full">
    <div className="text-center max-w-sm mx-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-ping"></div>
        <div className="relative w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200 transform rotate-6">
          <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
        </div>
      </div>
      <p className="text-gray-600 italic mb-2">
        "Preparando tu espacio especial..."
      </p>
      <p className="text-gray-400 text-sm mb-4">
        Puede tardar unos segundos
      </p>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full animate-shimmer" style={{ width: '70%' }}></div>
      </div>
      <p className="text-[10px] text-gray-400 mt-4">
        Always You 💙
      </p>
    </div>
  </div>
);

export default function Layout({ children }) {
  return (
    <ProtectedRoute
      allowedRoles={['user']}
      loadingComponent={
        <div className="flex min-h-screen">
          <UserPanel />
          <div className="w-full md:ml-64 ml-0 pb-20 md:pb-0">
            <ContentLoading />
          </div>
        </div>
      }
    >
      <div className="flex min-h-screen">
        <UserPanel />
        <div className="w-full md:ml-64 ml-0 pb-20 md:pb-0">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}