'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Textarea } from '@/app/components/ui/textarea';
import { Separator } from '@/app/components/ui/separator';
import { Settings, Building2, DollarSign, Users, Bell } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';

export default function AccountantSettingsPage() {
  const { session } = useAuth();
  const { toast } = useToast();

  // Mock company data
  const [companyInfo, setCompanyInfo] = useState({
    name: session?.user.companyName || 'ООО "Пример"',
    inn: '7707083893',
    address: 'г. Москва, ул. Примерная, д. 1',
    phone: '+7 (495) 123-45-67',
    email: 'info@example.com',
    website: 'www.example.com',
  });

  const [depositSettings, setDepositSettings] = useState({
    autoTopUp: false,
    autoTopUpAmount: 100000,
    minBalance: 50000,
    notificationThreshold: 100000,
  });

  const [employeeSettings, setEmployeeSettings] = useState({
    defaultLimit: 30000,
    requireApproval: true,
    approvalThreshold: 50000,
    allowRefunds: true,
  });

  const [notifications, setNotifications] = useState({
    lowBalance: true,
    largeTransaction: true,
    employeeLimit: true,
    monthlyReport: true,
  });

  const handleCompanyInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Настройки сохранены',
      description: 'Информация о компании обновлена',
    });
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Настройки сохранены',
      description: 'Настройки депозита обновлены',
    });
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Настройки сохранены',
      description: 'Настройки сотрудников обновлены',
    });
  };

  const handleNotificationsSubmit = () => {
    toast({
      title: 'Настройки сохранены',
      description: 'Настройки уведомлений обновлены',
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <Settings className="h-6 w-6 sm:h-8 sm:w-8" />
          Настройки компании
        </h1>
        <p className="text-muted-foreground">Управление настройками компании</p>
      </div>

      <div className="space-y-6">
        {/* Company Info Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Информация о компании</CardTitle>
              <CardDescription>Основные данные компании</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanyInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Название компании</Label>
                    <Input
                      id="companyName"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inn">ИНН</Label>
                    <Input
                      id="inn"
                      value={companyInfo.inn}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, inn: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Адрес</Label>
                    <Input
                      id="address"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Веб-сайт</Label>
                    <Input
                      id="website"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-[#7B91FF] hover:bg-[#E16D32]">
                  Сохранить изменения
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Deposit Settings Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Настройки депозита</CardTitle>
              <CardDescription>Управление корпоративным депозитом</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDepositSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoTopUp">Автоматическое пополнение</Label>
                    <p className="text-sm text-muted-foreground">
                      Автоматически пополнять баланс при достижении минимального уровня
                    </p>
                  </div>
                  <Switch
                    id="autoTopUp"
                    checked={depositSettings.autoTopUp}
                    onCheckedChange={(checked) =>
                      setDepositSettings({ ...depositSettings, autoTopUp: checked })
                    }
                  />
                </div>

                {depositSettings.autoTopUp && (
                  <div className="space-y-2 pl-4 border-l-2">
                    <Label htmlFor="autoTopUpAmount">Сумма автопополнения</Label>
                    <Input
                      id="autoTopUpAmount"
                      type="number"
                      value={depositSettings.autoTopUpAmount}
                      onChange={(e) =>
                        setDepositSettings({
                          ...depositSettings,
                          autoTopUpAmount: parseInt(e.target.value) || 0,
                        })
                      }
                      min="1"
                    />
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="minBalance">Минимальный баланс</Label>
                  <Input
                    id="minBalance"
                    type="number"
                    value={depositSettings.minBalance}
                    onChange={(e) =>
                      setDepositSettings({
                        ...depositSettings,
                        minBalance: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Минимальный остаток на балансе для работы системы
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notificationThreshold">Порог уведомления</Label>
                  <Input
                    id="notificationThreshold"
                    type="number"
                    value={depositSettings.notificationThreshold}
                    onChange={(e) =>
                      setDepositSettings({
                        ...depositSettings,
                        notificationThreshold: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Уведомлять, когда баланс опустится ниже этой суммы
                  </p>
                </div>

                <Button type="submit" className="bg-[#7B91FF] hover:bg-[#E16D32]">
                  Сохранить настройки
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Employee Settings Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Настройки сотрудников</CardTitle>
              <CardDescription>Лимиты и правила для сотрудников</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmployeeSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultLimit">Лимит по умолчанию</Label>
                  <Input
                    id="defaultLimit"
                    type="number"
                    value={employeeSettings.defaultLimit}
                    onChange={(e) =>
                      setEmployeeSettings({
                        ...employeeSettings,
                        defaultLimit: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Лимит расходов для новых сотрудников (₽)
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireApproval">Требовать согласование</Label>
                    <p className="text-sm text-muted-foreground">
                      Требовать согласование для крупных покупок
                    </p>
                  </div>
                  <Switch
                    id="requireApproval"
                    checked={employeeSettings.requireApproval}
                    onCheckedChange={(checked) =>
                      setEmployeeSettings({ ...employeeSettings, requireApproval: checked })
                    }
                  />
                </div>

                {employeeSettings.requireApproval && (
                  <div className="space-y-2 pl-4 border-l-2">
                    <Label htmlFor="approvalThreshold">Порог согласования</Label>
                    <Input
                      id="approvalThreshold"
                      type="number"
                      value={employeeSettings.approvalThreshold}
                      onChange={(e) =>
                        setEmployeeSettings({
                          ...employeeSettings,
                          approvalThreshold: parseInt(e.target.value) || 0,
                        })
                      }
                      min="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Сумма, выше которой требуется согласование (₽)
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowRefunds">Разрешить возвраты</Label>
                    <p className="text-sm text-muted-foreground">
                      Разрешить сотрудникам оформлять возвраты билетов
                    </p>
                  </div>
                  <Switch
                    id="allowRefunds"
                    checked={employeeSettings.allowRefunds}
                    onCheckedChange={(checked) =>
                      setEmployeeSettings({ ...employeeSettings, allowRefunds: checked })
                    }
                  />
                </div>

                <Button type="submit" className="bg-[#7B91FF] hover:bg-[#E16D32]">
                  Сохранить настройки
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>Настройки уведомлений для компании</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="lowBalance">Низкий баланс</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомлять при низком балансе депозита
                      </p>
                    </div>
                    <Switch
                      id="lowBalance"
                      checked={notifications.lowBalance}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, lowBalance: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="largeTransaction">Крупные транзакции</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомлять о крупных транзакциях сотрудников
                      </p>
                    </div>
                    <Switch
                      id="largeTransaction"
                      checked={notifications.largeTransaction}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, largeTransaction: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="employeeLimit">Превышение лимита</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомлять при превышении лимита сотрудника
                      </p>
                    </div>
                    <Switch
                      id="employeeLimit"
                      checked={notifications.employeeLimit}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, employeeLimit: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="monthlyReport">Ежемесячный отчет</Label>
                      <p className="text-sm text-muted-foreground">
                        Автоматически отправлять ежемесячный отчет
                      </p>
                    </div>
                    <Switch
                      id="monthlyReport"
                      checked={notifications.monthlyReport}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, monthlyReport: checked })
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleNotificationsSubmit} className="bg-[#7B91FF] hover:bg-[#E16D32]">
                  Сохранить настройки
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

