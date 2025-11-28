'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Users, Plus, Mail, Phone, Settings } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'pending' | 'inactive';
  role: 'employee';
  limit?: number;
  spentThisMonth?: number;
  joinedDate: string;
}

export default function AccountantEmployeesPage() {
  // Mock data
  const employees: Employee[] = [
    {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan.petrov@example.com',
      phone: '+7 (999) 123-45-67',
      status: 'active',
      role: 'employee',
      limit: 50000,
      spentThisMonth: 25500,
      joinedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      email: 'maria.sidorova@example.com',
      phone: '+7 (999) 234-56-78',
      status: 'active',
      role: 'employee',
      limit: 30000,
      spentThisMonth: 12000,
      joinedDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'Алексей Иванов',
      email: 'alexey.ivanov@example.com',
      phone: '+7 (999) 345-67-89',
      status: 'active',
      role: 'employee',
      limit: 40000,
      spentThisMonth: 18000,
      joinedDate: '2024-03-10',
    },
    {
      id: '4',
      name: 'Елена Смирнова',
      email: 'elena.smirnova@example.com',
      phone: '+7 (999) 456-78-90',
      status: 'pending',
      role: 'employee',
      limit: 25000,
      spentThisMonth: 0,
      joinedDate: '2024-12-01',
    },
    {
      id: '5',
      name: 'Дмитрий Козлов',
      email: 'dmitry.kozlov@example.com',
      phone: '+7 (999) 567-89-01',
      status: 'active',
      role: 'employee',
      limit: 60000,
      spentThisMonth: 45000,
      joinedDate: '2024-04-05',
    },
    {
      id: '6',
      name: 'Ольга Новикова',
      email: 'olga.novikova@example.com',
      phone: '+7 (999) 678-90-12',
      status: 'inactive',
      role: 'employee',
      limit: 35000,
      spentThisMonth: 0,
      joinedDate: '2024-05-12',
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
            <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            Сотрудники
          </h1>
          <p className="text-muted-foreground">Управление сотрудниками компании</p>
        </div>
        <Button asChild className="bg-[#7B91FF] hover:bg-[#E16D32]">
          <Link href="/dashboard/accountant/employees/invite">
            <Plus className="mr-2 h-4 w-4" />
            Пригласить сотрудника
          </Link>
        </Button>
      </div>

      {employees.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Список сотрудников</CardTitle>
            <CardDescription>
              Всего сотрудников: {employees.length} (Активных: {employees.filter(e => e.status === 'active').length})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden lg:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Сотрудник</TableHead>
                    <TableHead>Контакты</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Лимит</TableHead>
                    <TableHead>Потрачено (месяц)</TableHead>
                    <TableHead>Дата присоединения</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {employee.email}
                          </div>
                          {employee.phone && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {employee.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status === 'active'
                              ? 'default'
                              : employee.status === 'pending'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {employee.status === 'active'
                            ? 'Активен'
                            : employee.status === 'pending'
                            ? 'Ожидает'
                            : 'Неактивен'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {employee.limit ? `${employee.limit.toLocaleString('ru-RU')} ₽` : 'Не установлен'}
                      </TableCell>
                      <TableCell>
                        {employee.spentThisMonth !== undefined
                          ? `${employee.spentThisMonth.toLocaleString('ru-RU')} ₽`
                          : '—'}
                      </TableCell>
                      <TableCell>
                        {new Date(employee.joinedDate).toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-2">
              {employees.map((employee) => (
                <Card key={employee.id} className="border">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm truncate">{employee.name}</h3>
                          <Badge
                            variant={
                              employee.status === 'active'
                                ? 'default'
                                : employee.status === 'pending'
                                ? 'secondary'
                                : 'outline'
                            }
                            className="text-xs shrink-0"
                          >
                            {employee.status === 'active'
                              ? 'Активен'
                              : employee.status === 'pending'
                              ? 'Ожидает'
                              : 'Неактивен'}
                          </Badge>
                        </div>
                        <div className="space-y-0.5 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground truncate">
                            <Mail className="h-3 w-3 shrink-0" />
                            <span className="truncate">{employee.email}</span>
                          </div>
                          {employee.phone && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="h-3 w-3 shrink-0" />
                              <span className="truncate">{employee.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Лимит:</span>
                        <span className="font-medium text-right">
                          {employee.limit ? `${employee.limit.toLocaleString('ru-RU')} ₽` : 'Не установлен'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Потрачено:</span>
                        <span className="font-medium text-right">
                          {employee.spentThisMonth !== undefined
                            ? `${employee.spentThisMonth.toLocaleString('ru-RU')} ₽`
                            : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">С:</span>
                        <span className="text-muted-foreground text-right">
                          {new Date(employee.joinedDate).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t">
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                        <Settings className="mr-1.5 h-3.5 w-3.5" />
                        Настройки
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          title="Нет сотрудников"
          description="Пригласите сотрудников для работы с корпоративным депозитом"
          actionLabel="Пригласить сотрудника"
          onAction={() => window.location.href = '/dashboard/accountant/employees/invite'}
        />
      )}
    </div>
  );
}

