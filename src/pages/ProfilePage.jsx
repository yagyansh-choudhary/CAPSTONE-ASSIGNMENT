/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  RiUser3Line, 
  RiMapPin2Line, 
  RiLockPasswordLine, 
  RiFileList3Line,
  RiCameraLine,
  RiEditLine
} from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { orders } from '../data/products';
import { formatCurrency } from '../utils';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const tabs = [
    { id: 'info', icon: RiUser3Line, label: 'Personal Info' },
    { id: 'orders', icon: RiFileList3Line, label: 'My Orders' },
    { id: 'password', icon: RiLockPasswordLine, label: 'Security' },
  ];

  return (
    <div className="container mx-auto px-4 py-10 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-80">
          <div className="bg-white dark:bg-gray-800 rounded-3xl border dark:border-gray-700 p-8 text-center sticky top-30">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                <img 
                  src={`https://i.pravatar.cc/150?u=${user?.email}`} 
                  alt={user?.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-indigo-600 text-white rounded-full border-4 border-white dark:border-gray-800 hover:scale-110 transition-transform">
                <RiCameraLine size={16} />
              </button>
            </div>
            <h2 className="text-2xl font-black dark:text-white mb-1 truncate">{user?.name}</h2>
            <p className="text-gray-500 mb-8">{user?.email}</p>

            <div className="space-y-2">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-3xl border dark:border-gray-700 p-8 h-full min-h-[600px]">
             {activeTab === 'info' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <div className="flex justify-between items-center mb-10">
                   <h3 className="text-2xl font-black dark:text-white">Personal Information</h3>
                   {!isEditing && (
                     <button 
                       onClick={() => setIsEditing(true)}
                       className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-lg font-bold hover:bg-indigo-600 hover:text-white transition-all"
                     >
                       <RiEditLine /> Edit Profile
                     </button>
                   )}
                 </div>

                 <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Full Name</label>
                     <input 
                       disabled={!isEditing}
                       type="text" 
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white disabled:opacity-60"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Email Address</label>
                     <input 
                       disabled={true}
                       type="email" 
                       value={formData.email}
                       className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white disabled:opacity-60"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Phone Number</label>
                     <input 
                       disabled={!isEditing}
                       type="tel" 
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white disabled:opacity-60"
                     />
                   </div>
                   <div className="md:col-span-2 space-y-2">
                     <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Shipping Address</label>
                     <textarea 
                       disabled={!isEditing}
                       rows="4"
                       value={formData.address}
                       onChange={(e) => setFormData({...formData, address: e.target.value})}
                       className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white disabled:opacity-60 resize-none"
                     ></textarea>
                   </div>
                   
                   {isEditing && (
                     <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                       <button 
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-3 dark:text-white font-bold"
                       >
                         Cancel
                       </button>
                       <button 
                        type="submit"
                        className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl"
                       >
                         Save Changes
                       </button>
                     </div>
                   )}
                 </form>
               </motion.div>
             )}

             {activeTab === 'orders' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <h3 className="text-2xl font-black dark:text-white mb-10">Order History</h3>
                 <div className="space-y-6">
                   {orders.map(order => (
                     <div key={order.id} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                       <div className="flex items-center gap-4">
                         <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-indigo-600">
                           <RiFileList3Line size={24} />
                         </div>
                         <div>
                           <p className="font-bold dark:text-white">{order.id}</p>
                           <p className="text-sm text-gray-500">Placed on {order.date}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-10">
                         <div>
                           <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Status</p>
                           <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                             {order.status}
                           </span>
                         </div>
                         <div>
                           <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Total</p>
                           <p className="font-bold dark:text-white">{formatCurrency(order.total)}</p>
                         </div>
                         <button className="p-3 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors dark:text-gray-400">
                           <RiEditLine />
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>
               </motion.div>
             )}

             {activeTab === 'password' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <h3 className="text-2xl font-black dark:text-white mb-10">Security Settings</h3>
                 <div className="max-w-md space-y-8">
                    <div className="space-y-2">
                       <label className="text-sm font-bold dark:text-gray-300">New Password</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold dark:text-gray-300">Confirm New Password</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
                    </div>
                    <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold">Update Password</button>
                 </div>
               </motion.div>
             )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
