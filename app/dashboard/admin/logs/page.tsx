'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { FileText } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';

interface SystemLog {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  userEmail: string;
  details: string;
  level: 'info' | 'success' | 'warning' | 'error';
  ipAddress?: string;
}

export default function AdminLogsPage() {
  // Mock data
  const logs: SystemLog[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      action: 'Вход в систему',
      user: 'Иван Иванов',
      userEmail: 'ivan.ivanov@example.com',
      details: 'Успешный вход в систему',
      level: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      action: 'Создание бронирования',
      user: 'Мария Петрова',
      userEmail: 'maria.petrova@example.com',
      details: 'Создано бронирование #BK-2024-001234',
      level: 'info',
      ipAddress: '192.168.1.101',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      action: 'Обновление профиля',
      user: 'Александр Сидоров',
      userEmail: 'alex.sidorov@example.com',
      details: 'Обновлена информация профиля пользователя',
      level: 'info',
      ipAddress: '192.168.1.102',
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      action: 'Попытка входа',
      user: 'Неизвестный пользователь',
      userEmail: 'unknown@example.com',
      details: 'Неудачная попытка входа с неверным паролем',
      level: 'warning',
      ipAddress: '192.168.1.200',
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      action: 'Удаление пользователя',
      user: 'Администратор Системы',
      userEmail: 'admin@lenalink.ru',
      details: 'Удален пользователь user@example.com',
      level: 'warning',
      ipAddress: '192.168.1.1',
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
      action: 'Ошибка платежа',
      user: 'Дмитрий Волков',
      userEmail: 'dmitry.volkov@example.com',
      details: 'Ошибка при обработке платежа: недостаточно средств',
      level: 'error',
      ipAddress: '192.168.1.103',
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      action: 'Пополнение баланса',
      user: 'Анна Кузнецова',
      userEmail: 'anna.kuznetsova@example.com',
      details: 'Баланс пополнен на сумму 5000 ₽',
      level: 'success',
      ipAddress: '192.168.1.104',
    },
    {
      id: '8',
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      action: 'Создание компании',
      user: 'Администратор Системы',
      userEmail: 'admin@lenalink.ru',
      details: 'Создана новая компания "ООО Транспортные Решения"',
      level: 'info',
      ipAddress: '192.168.1.1',
    },
    {
      id: '9',
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      action: 'Выход из системы',
      user: 'Сергей Смирнов',
      userEmail: 'employee1@company.ru',
      details: 'Пользователь вышел из системы',
      level: 'info',
      ipAddress: '192.168.1.105',
    },
    {
      id: '10',
      timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
      action: 'Обновление тарифа',
      user: 'Ольга Соколова',
      userEmail: 'accountant1@company.ru',
      details: 'Обновлен тариф для компании "ООО Транспортные Решения"',
      level: 'info',
      ipAddress: '192.168.1.106',
    },
    {
      id: '11',
      timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
      action: 'Ошибка API',
      user: 'Система',
      userEmail: 'system@lenalink.ru',
      details: 'Ошибка при запросе к внешнему API: timeout',
      level: 'error',
      ipAddress: '127.0.0.1',
    },
    {
      id: '12',
      timestamp: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
      action: 'Экспорт данных',
      user: 'Николай Лебедев',
      userEmail: 'accountant2@logistics.ru',
      details: 'Экспортирован отчет по финансам за месяц',
      level: 'success',
      ipAddress: '192.168.1.107',
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getLevelVariant = (level: SystemLog['level']): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (level) {
      case 'success':
        return 'default';
      case 'info':
        return 'secondary';
      case 'warning':
        return 'outline';
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getLevelLabel = (level: SystemLog['level']) => {
    switch (level) {
      case 'success':
        return 'Успешно';
      case 'info':
        return 'Информация';
      case 'warning':
        return 'Предупреждение';
      case 'error':
        return 'Ошибка';
      default:
        return level;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
          Логи системы
        </h1>
        <p className="text-muted-foreground">Просмотр логов и истории операций</p>
      </div>

      {logs.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>История операций</CardTitle>
            <CardDescription>Все действия пользователей и системные события</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mobile view - Cards */}
            <div className="md:hidden space-y-3">
              {logs.map((log) => (
                <Card key={log.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm mb-1">{log.action}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {formatDate(log.timestamp)}
                        </div>
                      </div>
                      <Badge variant={getLevelVariant(log.level)} className="shrink-0">
                        {getLevelLabel(log.level)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Пользователь: </span>
                        <span className="font-medium">{log.user}</span>
                      </div>
                      <div className="text-xs text-muted-foreground break-all">
                        {log.userEmail}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Детали: </span>
                      {log.details}
                    </div>
                    {log.ipAddress && (
                      <div className="text-xs text-muted-foreground font-mono">
                        IP: {log.ipAddress}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Tablet view - Simplified table */}
            <div className="hidden md:block lg:hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">Время</TableHead>
                    <TableHead>Действие</TableHead>
                    <TableHead>Пользователь</TableHead>
                    <TableHead className="min-w-[200px]">Детали</TableHead>
                    <TableHead>Уровень</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className="font-medium text-sm">{log.action}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{log.user}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {log.userEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm max-w-[200px] truncate" title={log.details}>
                        {log.details}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getLevelVariant(log.level)} className="text-xs">
                          {getLevelLabel(log.level)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Desktop view - Full table */}
            <div className="hidden lg:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">Время</TableHead>
                    <TableHead>Действие</TableHead>
                    <TableHead>Пользователь</TableHead>
                    <TableHead className="min-w-[250px]">Детали</TableHead>
                    <TableHead>Уровень</TableHead>
                    <TableHead className="w-[120px]">IP адрес</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{log.user}</div>
                          <div className="text-sm text-muted-foreground">{log.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">{log.details}</TableCell>
                      <TableCell>
                        <Badge variant={getLevelVariant(log.level)}>
                          {getLevelLabel(log.level)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {log.ipAddress || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          title="Нет логов"
          description="Логи системы появятся здесь"
        />
      )}
    </div>
  );
}

