'use client';

import { useState, useEffect } from "react";
import { X, Calendar, Clock, User, Scissors } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import api from "@/lib/axios";
import { Barber } from "@/@types/barbers";

const schedulingSchema = z.object({
  userId: z.string().min(1, "ID do usuário é obrigatório"),
  barberId: z.string().min(1, "Barbeiro é obrigatório"),
  dayAt: z.string().min(1, "Data é obrigatória"),
  hourAt: z.string().min(1, "Horário é obrigatório"),
  serviceType: z.string().min(1, "Tipo de serviço é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
});

export type SchedulingSchema = z.infer<typeof schedulingSchema>;

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  userId: string;
}

const availableHours = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
];

export function SchedulingModal({ isOpen, onClose, selectedDate, userId }: SchedulingModalProps) {
  const [loading, setLoading] = useState(false);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loadingBarbers, setLoadingBarbers] = useState(false);

  const methods = useForm<SchedulingSchema>({
    resolver: zodResolver(schedulingSchema),
    defaultValues: {
      userId: userId,
      barberId: '',
      dayAt: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
      hourAt: '',
      serviceType: '',
      status: 'pendente',
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (isOpen) {
      fetchBarbers();
      if (selectedDate) {
        setValue('dayAt', selectedDate.toISOString().split('T')[0]);
      }
    }
  }, [isOpen, selectedDate, setValue]);

  const fetchBarbers = async () => {
    setLoadingBarbers(true);
    try {
      const response = await api.get('barbers');
      setBarbers(response.data);
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error);
      toast.error('Erro ao carregar lista de barbeiros', { theme: "light" });
    } finally {
      setLoadingBarbers(false);
    }
  };

  const onSubmit = async (data: SchedulingSchema) => {
    setLoading(true);
    try {
      await api.post('scheduling', data);
      toast.success('Agendamento criado com sucesso!', { theme: "light" });
      onClose();
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      toast.error('Erro ao criar agendamento', { theme: "light" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 w-96 max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-zinc-100 text-xl font-bold">Novo Agendamento</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-100"
            >
              <X size={20} />
            </Button>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={methods.control}
                name="barberId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="pl-10 bg-zinc-800 border-zinc-600 text-zinc-100">
                            <SelectValue placeholder={loadingBarbers ? "Carregando barbeiros..." : "Selecione o barbeiro"} />
                          </SelectTrigger>
                          <SelectContent>
                            {barbers.map((barber) => (
                              <SelectItem key={barber.id} value={barber.id}>
                                {barber.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="dayAt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                        <Input
                          {...field}
                          type="date"
                          className="pl-10 bg-zinc-800 border-zinc-600 text-zinc-100"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="hourAt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="pl-10 bg-zinc-800 border-zinc-600 text-zinc-100">
                            <SelectValue placeholder="Selecione seu horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableHours.map((hour) => (
                              <SelectItem key={hour} value={hour}>
                                {hour}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Scissors className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                        <Input
                          {...field}
                          placeholder="Tipo de serviço (ex: Corte, Barba)"
                          className="pl-10 bg-zinc-800 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Status (pendente, confirmado, cancelado)"
                        className="bg-zinc-800 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  {loading ? 'Criando...' : 'Criar Agendamento'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
