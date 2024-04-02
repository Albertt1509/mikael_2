import { Route, Routes, } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Layout from './components/navbar/Layout';
import HomePage from './user/homepage/Homepage';
import Profile from './user/profile/Profile';
import ProfileDetail from './user/profile/ProfileDetail';
import Blog from './user/blog/Blog';
import DetailBlog from './user/blog/DetailBlog';
import Pengumuman from './user/pengumuman/Pengumuman';
import PengumumanDetail from './user/pengumuman/PengumumanDetail';
import Login from './components/login/login';
import Dashboard from './admin/dashboard/home';
import AdminLay from './components/navbar/AdminLay'
import JadwalAdd from './admin/jadwal/addJawal'
import JadwalShow from './admin/jadwal/showJadwal'
import JadwalEdit from './admin/jadwal/editJadwal'
import EventShow from './admin/dashboard/showEvent'
import EventAdd from './admin/dashboard/addEvent'
import EventEdit from './admin/dashboard/editEvent'
import AdminProfile from './admin/profile/profile'
import AdminProfileShow from './admin/profile/showProfile'
import AdminProfileEdit from './admin/profile/editProfile'
import AdminPengumuman from './admin/pengumuman/pengumuman'
import AdminPengumumanEdit from './admin/pengumuman/editPengumuman'
import AdminPengumumanShow from './admin/pengumuman/pengumumanShow'
import AdminBlog from './admin/blog/blog'
import AdminBlogShow from './admin/blog/blogShow'
import AdminBlogEdit from './admin/blog/blogEdit'

// Koneksi API
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:id' element={<ProfileDetail />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:id' element={<DetailBlog />} />
          <Route path='/pengumuman' element={<Pengumuman />} />
          <Route path='/pengumuman/:id' element={<PengumumanDetail />} />
        </Route>
        <Route>
          <Route path='/dashboard' element={<AdminLay />}>
            <Route index element={<Dashboard />} />
            <Route path='/dashboard/jadwal-add' element={<JadwalAdd />} />
            <Route path='/dashboard/jadwal-show' element={<JadwalShow />} />
            <Route path='/dashboard/jadwal-edit/:id' element={<JadwalEdit />} />
            <Route path='/dashboard/event-add' element={<EventAdd />} />
            <Route path='/dashboard/event-show' element={<EventShow />} />
            <Route path='/dashboard/event-edit/:id' element={<EventEdit />} />
            <Route path='/dashboard/profile-add' element={<AdminProfile />} />
            <Route path='/dashboard/profile-edit/:id' element={<AdminProfileEdit />} />
            <Route path='/dashboard/profile-show' element={<AdminProfileShow />} />
            <Route path='/dashboard/pengumuman-add' element={<AdminPengumuman />} />
            <Route path='/dashboard/pengumuman-show' element={<AdminPengumumanShow />} />
            <Route path='/dashboard/pengumuman-edit/:id' element={<AdminPengumumanEdit />} />
            <Route path='/dashboard/blog-add' element={<AdminBlog />} />
            <Route path='/dashboard/blog-show' element={<AdminBlogShow />} />
            <Route path='/dashboard/blog-edit/:id' element={<AdminBlogEdit />} />
          </Route>
        </Route >
      </Routes >
    </>
  );
}

export default App;
