'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Users, Search, UserPlus, UserCog, Calculator } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { UserRole } from '@/app/lib/mockUsers';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  balance?: number;
  companyId?: string;
  companyName?: string;
  companyBalance?: number;
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'ivan.ivanov@example.com',
      name: 'Иван Иванов',
      role: 'user',
      balance: 15000,
    },
    {
      id: '2',
      email: 'maria.petrova@example.com',
      name: 'Мария Петрова',
      role: 'user',
      balance: 8500,
    },
    {
      id: '3',
      email: 'alex.sidorov@example.com',
      name: 'Александр Сидоров',
      role: 'user',
      balance: 22000,
    },
    {
      id: '4',
      email: 'anna.kuznetsova@example.com',
      name: 'Анна Кузнецова',
      role: 'user',
      balance: 12000,
    },
    {
      id: '5',
      email: 'dmitry.volkov@example.com',
      name: 'Дмитрий Волков',
      role: 'user',
      balance: 5000,
    },
    {
      id: '6',
      email: 'employee1@company.ru',
      name: 'Сергей Смирнов',
      role: 'employee',
      companyId: 'comp1',
      companyName: 'ООО "Транспортные Решения"',
    },
    {
      id: '7',
      email: 'employee2@company.ru',
      name: 'Елена Новикова',
      role: 'employee',
      companyId: 'comp1',
      companyName: 'ООО "Транспортные Решения"',
    },
    {
      id: '8',
      email: 'employee3@logistics.ru',
      name: 'Павел Морозов',
      role: 'employee',
      companyId: 'comp2',
      companyName: 'ООО "Логистика Плюс"',
    },
    {
      id: '9',
      email: 'accountant1@company.ru',
      name: 'Ольга Соколова',
      role: 'accountant',
      companyId: 'comp1',
      companyName: 'ООО "Транспортные Решения"',
      companyBalance: 500000,
    },
    {
      id: '10',
      email: 'accountant2@logistics.ru',
      name: 'Николай Лебедев',
      role: 'accountant',
      companyId: 'comp2',
      companyName: 'ООО "Логистика Плюс"',
      companyBalance: 750000,
    },
    {
      id: '11',
      email: 'accountant3@transport.ru',
      name: 'Татьяна Орлова',
      role: 'accountant',
      companyId: 'comp3',
      companyName: 'ООО "Быстрая Доставка"',
      companyBalance: 320000,
    },
    {
      id: '12',
      email: 'admin@lenalink.ru',
      name: 'Администратор Системы',
      role: 'admin',
    },
  ];

  const filteredUsers = useMemo(() => {
    let filtered = mockUsers;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.companyName?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery]);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'user':
        return 'Пользователь';
      case 'employee':
        return 'Сотрудник';
      case 'accountant':
        return 'Бухгалтер';
      case 'admin':
        return 'Администратор';
      default:
        return role;
    }
  };

  const getRoleVariant = (role: UserRole): 'default' | 'secondary' | 'outline' => {
    switch (role) {
      case 'user':
        return 'default';
      case 'employee':
        return 'secondary';
      case 'accountant':
        return 'outline';
      case 'admin':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <Users className="h-6 w-6 sm:h-8 sm:w-8" />
          Пользователи
        </h1>
        <p className="text-muted-foreground">Управление пользователями системы</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск пользователей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button className="bg-[#7B91FF] hover:bg-[#6B81EF]">
            <UserPlus className="mr-2 h-4 w-4" />
            Пользователи
          </Button>
          <Button variant="outline">
            <UserCog className="mr-2 h-4 w-4" />
            Сотрудники
          </Button>
          <Button variant="outline">
            <Calculator className="mr-2 h-4 w-4" />
            Бухгалтеры
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все пользователи</CardTitle>
          <CardDescription>Список всех пользователей системы</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Баланс / Компания</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleVariant(user.role)}>
                            {getRoleLabel(user.role)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.role === 'user' && user.balance !== undefined
                            ? `${user.balance.toLocaleString('ru-RU')} ₽`
                            : user.role === 'accountant' && user.companyName
                              ? user.companyName
                              : user.role === 'employee' && user.companyName
                                ? user.companyName
                                : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-2">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="border">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <h3 className="font-semibold text-xs truncate">{user.name}</h3>
                            <Badge
                              variant={getRoleVariant(user.role)}
                              className="text-[10px] shrink-0 px-1.5 py-0"
                            >
                              {getRoleLabel(user.role)}
                            </Badge>
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>

                      <div className="pt-1 border-t space-y-1 text-[11px]">
                        {user.role === 'user' && user.balance !== undefined && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Баланс:</span>
                            <span className="font-medium text-right">
                              {user.balance.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        )}
                        {(user.role === 'employee' || user.role === 'accountant') && user.companyName && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Компания:</span>
                            <span className="font-medium text-right truncate ml-2">
                              {user.companyName}
                            </span>
                          </div>
                        )}
                        {user.role === 'accountant' && user.companyBalance !== undefined && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Баланс компании:</span>
                            <span className="font-medium text-right">
                              {user.companyBalance.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Пользователи не найдены
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

