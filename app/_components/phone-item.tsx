"use client";

import { Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

export function PhoneItem({ phone }: PhoneItemProps) {
  const handleCopyPhone = async () => {
    if (!navigator.clipboard) {
      toast.error("A cópia não é suportada neste navegador/contexto.");
      return;
    }

    try {
      await navigator.clipboard.writeText(phone);
      toast.success("Telefone copiado!");
    } catch (error) {
      console.error("Failed to copy phone number:", error);
      toast.error("Não foi possível copiar. Copie manualmente.");
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Smartphone className="size-6" />
        <p className="text-sm text-foreground">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={handleCopyPhone}
      >
        Copiar
      </Button>
    </div>
  );
}
