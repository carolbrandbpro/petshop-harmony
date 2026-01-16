import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Search,
  Phone,
  Mail,
  MapPin,
  Dog,
  Cat,
  ChevronRight,
  PawPrint,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pet {
  id: number;
  name: string;
  type: "dog" | "cat" | "other";
  breed: string;
  notes?: string;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  address?: string;
  pets: Pet[];
  totalServices: number;
  totalPurchases: number;
  lastVisit: string;
}

const Clientes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const { toast } = useToast();

  const clients: Client[] = [
    {
      id: 1,
      name: "Maria Silva",
      phone: "(11) 99999-1234",
      email: "maria.silva@email.com",
      address: "Rua das Flores, 123 - Centro",
      pets: [
        { id: 1, name: "Thor", type: "dog", breed: "Golden Retriever" },
        { id: 2, name: "Mel", type: "dog", breed: "Poodle" },
      ],
      totalServices: 24,
      totalPurchases: 12,
      lastVisit: "15/01/2026",
    },
    {
      id: 2,
      name: "João Santos",
      phone: "(11) 98888-5678",
      email: "joao.santos@email.com",
      pets: [{ id: 3, name: "Luna", type: "cat", breed: "Siamês" }],
      totalServices: 8,
      totalPurchases: 5,
      lastVisit: "14/01/2026",
    },
    {
      id: 3,
      name: "Ana Costa",
      phone: "(11) 97777-9012",
      email: "ana.costa@email.com",
      address: "Av. Brasil, 456 - Jardins",
      pets: [
        { id: 4, name: "Max", type: "dog", breed: "Labrador", notes: "Alérgico a shampoo comum" },
      ],
      totalServices: 15,
      totalPurchases: 8,
      lastVisit: "13/01/2026",
    },
    {
      id: 4,
      name: "Pedro Lima",
      phone: "(11) 96666-3456",
      email: "pedro.lima@email.com",
      pets: [
        { id: 5, name: "Bella", type: "dog", breed: "Shih Tzu" },
        { id: 6, name: "Rex", type: "dog", breed: "Pastor Alemão" },
      ],
      totalServices: 30,
      totalPurchases: 20,
      lastVisit: "12/01/2026",
    },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.pets.some((pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✅ Cliente cadastrado!",
      description: "Agora você pode cadastrar os pets deste cliente.",
    });
    setIsNewClientOpen(false);
  };

  const getPetIcon = (type: Pet["type"]) => {
    switch (type) {
      case "dog":
        return <Dog className="w-4 h-4" />;
      case "cat":
        return <Cat className="w-4 h-4" />;
      default:
        return <PawPrint className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout
      title="Clientes & Pets"
      subtitle="Aqui você pode acompanhar todo o histórico dos pets 💙"
    >
      <div className="flex gap-6 animate-fade-in">
        {/* Client List */}
        <div className="w-96 flex-shrink-0">
          <div className="card-elevated">
            <div className="p-4 border-b border-border space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente ou pet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Dialog open={isNewClientOpen} onOpenChange={setIsNewClientOpen}>
                <DialogTrigger asChild>
                  <Button variant="gradient" className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Cliente
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>👤 Novo Cliente</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleNewClient} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Nome Completo</Label>
                      <Input placeholder="Nome do cliente" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Telefone (WhatsApp)</Label>
                        <Input placeholder="(00) 00000-0000" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="email@exemplo.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Endereço (opcional)</Label>
                      <Input placeholder="Rua, número - Bairro" />
                    </div>

                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold text-foreground mb-3">🐾 Cadastrar Pet</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome do Pet</Label>
                          <Input placeholder="Nome do pet" />
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
                      <div className="space-y-2 mt-4">
                        <Label>Raça</Label>
                        <Input placeholder="Ex: Golden Retriever" />
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label>Observações</Label>
                        <Textarea placeholder="Ex: Alergia, comportamento..." />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setIsNewClientOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" variant="gradient" className="flex-1">
                        Cadastrar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`w-full p-4 text-left border-b border-border hover:bg-muted/50 transition-colors ${
                    selectedClient?.id === client.id ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.phone}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {client.pets.map((pet) => (
                          <span
                            key={pet.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                          >
                            {getPetIcon(pet.type)}
                            {pet.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="flex-1">
          {selectedClient ? (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="card-elevated p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {selectedClient.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        {selectedClient.name}
                      </h2>
                      <p className="text-muted-foreground">
                        Cliente desde 2024
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Telefone</p>
                      <p className="text-sm font-medium">{selectedClient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium truncate">{selectedClient.email}</p>
                    </div>
                  </div>
                  {selectedClient.address && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Endereço</p>
                        <p className="text-sm font-medium truncate">{selectedClient.address}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-primary mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-2xl font-bold">{selectedClient.totalServices}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Serviços realizados</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-success mb-1">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-2xl font-bold">{selectedClient.totalPurchases}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Compras</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {selectedClient.lastVisit}
                    </div>
                    <p className="text-sm text-muted-foreground">Última visita</p>
                  </div>
                </div>
              </div>

              {/* Pets */}
              <div className="card-elevated">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Pets 🐾</h3>
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    <Plus className="w-4 h-4" />
                    Adicionar Pet
                  </Button>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  {selectedClient.pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                          {pet.type === "dog" ? (
                            <Dog className="w-6 h-6 text-secondary-foreground" />
                          ) : pet.type === "cat" ? (
                            <Cat className="w-6 h-6 text-secondary-foreground" />
                          ) : (
                            <PawPrint className="w-6 h-6 text-secondary-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{pet.name}</p>
                          <p className="text-sm text-muted-foreground">{pet.breed}</p>
                        </div>
                      </div>
                      {pet.notes && (
                        <p className="text-xs text-warning bg-warning/10 px-2 py-1 rounded">
                          ⚠️ {pet.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card-elevated h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PawPrint className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Selecione um cliente</p>
                <p className="text-sm">para ver os detalhes e histórico</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clientes;
