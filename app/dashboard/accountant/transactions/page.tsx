'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { TrendingUp, Search, Download, ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { useState, useMemo } from 'react';

interface Transaction {
  id: string;
  date: string;
  employee: string;
  employeeEmail: string;
  type: 'purchase' | 'topup' | 'refund';
  description: string;
  amount: number;
  balance: number;
}

export default function AccountantTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Mock data
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-12-10',
      employee: 'Иван Петров',
      employeeEmail: 'ivan.petrov@example.com',
      type: 'purchase',
      description: 'Билет Москва → Санкт-Петербург',
      amount: -8500,
      balance: 491500,
    },
    {
      id: '2',
      date: '2024-12-08',
      employee: 'Мария Сидорова',
      employeeEmail: 'maria.sidorova@example.com',
      type: 'purchase',
      description: 'Билет Москва → Казань',
      amount: -12000,
      balance: 500000,
    },
    {
      id: '3',
      date: '2024-12-05',
      employee: 'Иван Петров',
      employeeEmail: 'ivan.petrov@example.com',
      type: 'purchase',
      description: 'Билет Москва → Сочи',
      amount: -15000,
      balance: 512000,
    },
    {
      id: '4',
      date: '2024-12-01',
      employee: 'Система',
      employeeEmail: 'system@lenalink.com',
      type: 'topup',
      description: 'Пополнение баланса',
      amount: 200000,
      balance: 527000,
    },
    {
      id: '5',
      date: '2024-11-28',
      employee: 'Алексей Иванов',
      employeeEmail: 'alexey.ivanov@example.com',
      type: 'purchase',
      description: 'Билет Москва → Новосибирск',
      amount: -18000,
      balance: 327000,
    },
    {
      id: '6',
      date: '2024-11-25',
      employee: 'Мария Сидорова',
      employeeEmail: 'maria.sidorova@example.com',
      type: 'refund',
      description: 'Возврат билета Москва → Казань',
      amount: 12000,
      balance: 345000,
    },
    {
      id: '7',
      date: '2024-11-20',
      employee: 'Иван Петров',
      employeeEmail: 'ivan.petrov@example.com',
      type: 'purchase',
      description: 'Билет Москва → Екатеринбург',
      amount: -9500,
      balance: 333000,
    },
    {
      id: '8',
      date: '2024-11-15',
      employee: 'Система',
      employeeEmail: 'system@lenalink.com',
      type: 'topup',
      description: 'Пополнение баланса',
      amount: 300000,
      balance: 342500,
    },
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesEmployee = employeeFilter === 'all' || transaction.employeeEmail === employeeFilter;
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      
      return matchesSearch && matchesEmployee && matchesType;
    });
  }, [searchQuery, employeeFilter, typeFilter, transactions]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'Покупка билетов';
      case 'topup':
        return 'Пополнение';
      case 'refund':
        return 'Возврат';
      default:
        return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowDown className="h-4 w-4 text-white" />;
      case 'topup':
        return <ArrowUp className="h-4 w-4 text-white" />;
      case 'refund':
        return <RefreshCw className="h-4 w-4 text-white" />;
      default:
        return null;
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'destructive';
      case 'topup':
        return 'default';
      case 'refund':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const uniqueEmployees = useMemo(() => {
    const employees = transactions
      .filter((t) => t.employee !== 'Система')
      .map((t) => ({ email: t.employeeEmail, name: t.employee }));
    const unique = Array.from(new Map(employees.map((e) => [e.email, e])).values());
    return unique;
  }, [transactions]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />
            Транзакции
          </h1>
          <p className="text-muted-foreground">Все операции по корпоративному депозиту</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Экспорт
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск транзакций..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Сотрудник" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все сотрудники</SelectItem>
            {uniqueEmployees.map((employee) => (
              <SelectItem key={employee.email} value={employee.email}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Тип операции" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="purchase">Покупка билетов</SelectItem>
            <SelectItem value="topup">Пополнение</SelectItem>
            <SelectItem value="refund">Возврат</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Список транзакций</CardTitle>
            <CardDescription>
              Всего транзакций: {filteredTransactions.length} из {transactions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden lg:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Сотрудник</TableHead>
                    <TableHead>Тип операции</TableHead>
                    <TableHead>Описание</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                    <TableHead className="text-right">Баланс</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.employee}</div>
                          <div className="text-sm text-muted-foreground">{transaction.employeeEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getTypeVariant(transaction.type)} className="flex items-center gap-1 w-fit">
                          {getTypeIcon(transaction.type)}
                          {getTypeLabel(transaction.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount.toLocaleString('ru-RU')} ₽
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {transaction.balance.toLocaleString('ru-RU')} ₽
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {filteredTransactions.map((transaction) => (
                <Card key={transaction.id} className="border">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getTypeVariant(transaction.type)} className="flex items-center gap-1">
                            {getTypeIcon(transaction.type)}
                            {getTypeLabel(transaction.type)}
                          </Badge>
                        </div>
                        <p className="font-medium text-sm mb-1">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Сотрудник:</span>
                        <span className="font-medium">{transaction.employee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-xs text-muted-foreground truncate ml-2 max-w-[60%]">
                          {transaction.employeeEmail}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Баланс:</span>
                        <span className="font-medium">{transaction.balance.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          title="Нет транзакций"
          description={
            searchQuery || employeeFilter !== 'all' || typeFilter !== 'all'
              ? 'Не найдено транзакций по заданным критериям'
              : 'Транзакции появятся здесь после операций с балансом'
          }
        />
      )}
    </div>
  );
}

