'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Building2, Plus, Users, DollarSign, Settings } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';
import Link from 'next/link';

interface Company {
  id: string;
  name: string;
  inn: string;
  balance: number;
  employees: number;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
}

export default function AdminCompaniesPage() {
  // Mock data
  const companies: Company[] = [
    {
      id: '1',
      name: 'ООО "Пример"',
      inn: '7707083893',
      balance: 500000,
      employees: 15,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'ООО "Транспортные решения"',
      inn: '7708123456',
      balance: 1250000,
      employees: 32,
      status: 'active',
      createdAt: '2024-02-20',
    },
    {
      id: '3',
      name: 'АО "Логистика Плюс"',
      inn: '7709234567',
      balance: 750000,
      employees: 24,
      status: 'active',
      createdAt: '2024-03-10',
    },
    {
      id: '4',
      name: 'ООО "Бизнес Тревел"',
      inn: '7710345678',
      balance: 300000,
      employees: 8,
      status: 'active',
      createdAt: '2024-04-05',
    },
    {
      id: '5',
      name: 'ИП Иванов И.И.',
      inn: '7711456789',
      balance: 50000,
      employees: 3,
      status: 'pending',
      createdAt: '2024-12-01',
    },
    {
      id: '6',
      name: 'ООО "Корпоративные поездки"',
      inn: '7712567890',
      balance: 0,
      employees: 0,
      status: 'suspended',
      createdAt: '2024-05-12',
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
            <Building2 className="h-6 w-6 sm:h-8 sm:w-8" />
            Компании
          </h1>
          <p className="text-muted-foreground">Управление компаниями и их депозитами</p>
        </div>
        <Button asChild className="bg-[#7B91FF] hover:bg-[#E16D32]">
          <Link href="/dashboard/admin/companies/new">
            <Plus className="mr-2 h-4 w-4" />
            Создать компанию
          </Link>
        </Button>
      </div>

      {companies.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Список компаний</CardTitle>
            <CardDescription>
              Всего компаний: {companies.length} (Активных: {companies.filter(c => c.status === 'active').length})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden lg:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Компания</TableHead>
                    <TableHead>ИНН</TableHead>
                    <TableHead>Баланс</TableHead>
                    <TableHead>Сотрудники</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата регистрации</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell className="text-muted-foreground">{company.inn}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {company.balance.toLocaleString('ru-RU')} ₽
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {company.employees}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            company.status === 'active'
                              ? 'default'
                              : company.status === 'pending'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {company.status === 'active'
                            ? 'Активна'
                            : company.status === 'pending'
                            ? 'Ожидает'
                            : 'Приостановлена'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(company.createdAt).toLocaleDateString('ru-RU', {
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
              {companies.map((company) => (
                <Card key={company.id} className="border">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <h3 className="font-semibold text-xs truncate">{company.name}</h3>
                          <Badge
                            variant={
                              company.status === 'active'
                                ? 'default'
                                : company.status === 'pending'
                                ? 'secondary'
                                : 'outline'
                            }
                            className="text-[10px] shrink-0 px-1.5 py-0"
                          >
                            {company.status === 'active'
                              ? 'Активна'
                              : company.status === 'pending'
                              ? 'Ожидает'
                              : 'Приостановлена'}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">ИНН: {company.inn}</p>
                      </div>
                    </div>

                    <div className="pt-1 border-t space-y-1 text-[11px]">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Баланс:</span>
                        <span className="font-medium text-right">
                          {company.balance.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Сотрудники:</span>
                        <span className="font-medium text-right">{company.employees}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">С:</span>
                        <span className="text-muted-foreground text-right">
                          {new Date(company.createdAt).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1 border-t">
                      <Button variant="outline" size="sm" className="w-full h-7 text-[11px]">
                        <Settings className="mr-1 h-3 w-3" />
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
          title="Нет компаний"
          description="Создайте новую компанию для начала работы"
          actionLabel="Создать компанию"
          onAction={() => window.location.href = '/dashboard/admin/companies/new'}
        />
      )}
    </div>
  );
}

