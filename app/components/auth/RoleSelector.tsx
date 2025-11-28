'use client';

import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import type { UserRole } from '@/app/lib/mockUsers';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function RoleSelector({ selectedRole, onRoleChange }: RoleSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base">Выберите тип аккаунта</Label>
      <RadioGroup value={selectedRole} onValueChange={(value) => onRoleChange(value as UserRole)}>
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
          <RadioGroupItem value="user" id="modal-role-user" />
          <Label htmlFor="modal-role-user" className="font-normal cursor-pointer flex-1">
            <div>
              <div className="font-semibold">Пользователь</div>
              <div className="text-sm text-muted-foreground">
                Покупка билетов и управление бронированиями
              </div>
            </div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
          <RadioGroupItem value="partner" id="modal-role-partner" />
          <Label htmlFor="modal-role-partner" className="font-normal cursor-pointer flex-1">
            <div>
              <div className="font-semibold">Партнёр</div>
              <div className="text-sm text-muted-foreground">
                Предоставление транспортных услуг
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

