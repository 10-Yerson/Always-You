
import AdminDashboard from './components/Dashboard';
import AdminLayout from "./layouts/AdminLayout";


export default function AdminPage() {

    return (
        <AdminLayout>
            <AdminDashboard />
        </AdminLayout>
    );
}
