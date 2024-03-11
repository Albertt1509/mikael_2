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
import AdminProfile from './admin/profile/profile'
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
            <Route path='/dashboard/profile-add' element={<AdminProfile />} />
            <Route path='/dashboard/profile-edit' element={<AdminProfileEdit />} />
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
