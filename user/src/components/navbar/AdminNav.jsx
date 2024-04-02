import { useLocation } from 'react-router-dom';
import Dashboard from '../../admin/dashboard/home';
import JadwalAdd from '../../admin/jadwal/addJawal'
import JadwalEdit from '../../admin/jadwal/editJadwal'
import JadwalShow from '../../admin/jadwal/showJadwal'
import DashboardAdd from '../../admin/dashboard/addEvent';
import DashboardShow from '../../admin/dashboard/showEvent';
import DashboardEdit from '../../admin/dashboard/editEvent';
import ProfileContent from '../../admin/profile/profile';
import EditProfile from '../../admin/profile/editProfile';
import ShowProfile from '../../admin/profile/showProfile';
import Pengumuman from '../../admin/pengumuman/pengumuman';
import PengumumanShow from '../../admin/pengumuman/pengumumanShow';
import PengumumanEdit from '../../admin/pengumuman/editPengumuman';
import Blog from '../../admin/blog/blog';
import BlogShow from '../../admin/blog/blogShow';
import BlogEdit from '../../admin/blog/blogEdit';
import { useParams } from 'react-router-dom';

const Content = () => {
    const location = useLocation();
    const { id } = useParams();
    return (
        <div className="min-h-screen p-8">
            {location.pathname === '/dashboard' && (
                <Dashboard />
            )}
            {location.pathname === '/dashboard/ jadwal-show' && (
                <JadwalAdd />
            )}
            {location.pathname === '/dashboard/ jadwal-edit' && (
                <JadwalShow />
            )}
            {location.pathname === `/dashboard/jadwal-edit/${id}` && (
                <JadwalEdit />
            )}
            {location.pathname === '/dashboard/event-show' && (
                <DashboardShow />
            )}
            {location.pathname === '/dashboard/event-add' && (
                <DashboardAdd />
            )}
            {location.pathname === `/dashboard/event-edit/${id}` && (
                <DashboardEdit />
            )}
            {location.pathname === ('/dashboard/profile') && (
                <ProfileContent />
            )}
            {location.pathname === `/dashboard/profile-edit/${id}` && (
                <EditProfile />
            )}
            {location.pathname === '/dashboard/profile-show' && (
                <ShowProfile />
            )}
            {location.pathname === '/dashboard/pengumuman-add' && (
                <Pengumuman />
            )}
            {location.pathname === '/dashboard/pengumuman-show' && (
                <PengumumanShow />
            )}
            {location.pathname === `/dashboard/pengumuman-edit/${id}` && (
                <PengumumanEdit />
            )}
            {location.pathname === '/dashboard/blog-add' && (
                <Blog />
            )}
            {location.pathname === '/dashboard/blog-show' && (
                <BlogShow />
            )}
            {location.pathname === `/dashboard/blog-edit/${id}` && (
                <BlogEdit />
            )}

        </div>
    );
};

export default Content;
