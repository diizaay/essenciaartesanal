import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllUsers } from '../../services/api';
import { toast } from 'sonner';
import { UserCheck, Shield } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Erro ao carregar utilizadores');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
                        <p className="mt-4 text-[var(--color-text)] font-['Poppins']">A carregar utilizadores...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-['Poppins'] font-bold text-gray-900">Utilizadores Registados</h1>
                <p className="text-gray-500 font-['Poppins'] mt-1">{users.length} utilizadores no total</p>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Utilizador</th>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Telefone</th>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Data de Registo</th>
                                <th className="px-6 py-3 text-left text-xs font-['Poppins'] font-medium text-gray-500 uppercase">Tipo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-['Poppins']">
                                        Nenhum utilizador encontrado
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${user.isAdmin ? 'bg-purple-100' : 'bg-blue-100'
                                                    }`}>
                                                    {user.isAdmin ? (
                                                        <Shield className="w-5 h-5 text-purple-600" />
                                                    ) : (
                                                        <UserCheck className="w-5 h-5 text-blue-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-['Poppins'] font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-['Poppins']">{user.phone || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-['Poppins']">{formatDate(user.createdAt)}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-['Poppins'] font-medium ${user.isAdmin
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                    }`}
                                            >
                                                {user.isAdmin ? 'Administrador' : 'Utilizador'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Users;
