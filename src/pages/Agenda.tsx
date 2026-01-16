import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Clock,
  Dog,
  Cat,
  Phone,
  CheckCircle2,
  XCircle,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: number;
  time: string;
  petName: string;
  petType: "dog" | "cat";
  ownerName: string;
  phone: string;
  service: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const appointments: Appointment[] = [
    {
      id: 1,
      time: "09:00",
      petName: "Thor",
      petType: "dog",
      ownerName: "Maria Silva",
      phone: "(11) 99999-1234",
      service: "Banho + Tosa",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30",
      petName: "Luna",
      petType: "cat",
      ownerName: "João Santos",
      phone: "(11) 98888-5678",
      service: "Banho",
      status: "pending",
    },
    {
      id: 3,
      time: "11:00",
      petName: "Max",
      petType: "dog",
      ownerName: "Ana Costa",
      phone: "(11) 97777-9012",
      service: "Tosa Higiênica",
      status: "completed",
      notes: "Pet nervoso, precisa de cuidado extra",
    },
    {
      id: 4,
      time: "14:00",
      petName: "Bella",
      petType: "dog",
      ownerName: "Pedro Lima",
      phone: "(11) 96666-3456",
      service: "Banho + Tosa",
      status: "confirmed",
    },
    {
      id: 5,
      time: "15:30",
      petName: "Simba",
      petType: "cat",
      ownerName: "Carla Mendes",
      phone: "(11) 95555-7890",
      service: "Corte de Unhas",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return <span className="badge-status badge-success">Confirmado</span>;
      case "pending":
        return <span className="badge-status badge-pending">Pendente</span>;
      case "completed":
        return <span className="badge-status badge-info">Concluído</span>;
      case "cancelled":
        return <span className="badge-status bg-destructive/10 text-destructive">Cancelado</span>;
    }
  };

  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✅ Agendamento confirmado!",
      description: "Deseja enviar lembrete para o cliente no WhatsApp?",
    });
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout
      title="Agenda"
      subtitle="Gerencie os agendamentos de banho e tosa"
    >
      <div className="flex gap-6 animate-fade-in">
        {/* Calendar Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="card-elevated p-4 mb-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg"
            />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  🐶 Novo Agendamento
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleNewAppointment} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Cliente</Label>
                    <Input placeholder="Nome completo" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone (WhatsApp)</Label>
                    <Input placeholder="(00) 00000-0000" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Pet</Label>
                    <Input placeholder="Nome do pet" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">🐕 Cachorro</SelectItem>
                        <SelectItem value="cat">🐈 Gato</SelectItem>
                        <SelectItem value="other">🐾 Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Raça</Label>
                  <Input placeholder="Ex: Golden Retriever" />
                </div>

                <div className="space-y-2">
                  <Label>Serviço</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bath">🛁 Banho</SelectItem>
                      <SelectItem value="grooming">✂️ Tosa</SelectItem>
                      <SelectItem value="bath-grooming">🛁✂️ Banho + Tosa</SelectItem>
                      <SelectItem value="hygiene">🧼 Tosa Higiênica</SelectItem>
                      <SelectItem value="nails">💅 Corte de Unhas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Input type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário</Label>
                    <Input type="time" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Observações</Label>
                  <Textarea placeholder="Ex: Pet agressivo, alergia a produtos..." />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="gradient" className="flex-1">
                    Confirmar Agendamento
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Quick Stats */}
          <div className="card-elevated p-4 mt-4 space-y-3">
            <h3 className="font-semibold text-foreground">Resumo do Dia</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold">{appointments.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Confirmados</span>
                <span className="font-semibold text-success">
                  {appointments.filter((a) => a.status === "confirmed").length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pendentes</span>
                <span className="font-semibold text-warning">
                  {appointments.filter((a) => a.status === "pending").length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Concluídos</span>
                <span className="font-semibold text-info">
                  {appointments.filter((a) => a.status === "completed").length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="flex-1">
          <div className="card-elevated">
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">
                Agendamentos -{" "}
                {date?.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>
            </div>

            <div className="divide-y divide-border">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Time */}
                    <div className="w-20 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-foreground font-semibold">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {apt.time}
                      </div>
                    </div>

                    {/* Pet Icon */}
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      {apt.petType === "dog" ? (
                        <Dog className="w-6 h-6 text-secondary-foreground" />
                      ) : (
                        <Cat className="w-6 h-6 text-secondary-foreground" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{apt.petName}</p>
                        {getStatusBadge(apt.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{apt.ownerName}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-primary font-medium">
                          {apt.service}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {apt.phone}
                        </span>
                      </div>
                      {apt.notes && (
                        <p className="text-xs text-warning mt-1">⚠️ {apt.notes}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="text-success hover:text-success hover:bg-success/10">
                        <CheckCircle2 className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10">
                        <MessageCircle className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <XCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Agenda;
