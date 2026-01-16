import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Bath,
  Calendar,
  DollarSign,
  Package,
  Plus,
  TrendingUp,
  Users,
  ArrowRight,
  Clock,
  Dog,
  Cat,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const todayStats = [
    {
      label: "Banhos & Tosas",
      value: "12",
      change: "+3 hoje",
      icon: Bath,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Agendamentos",
      value: "8",
      change: "Pendentes",
      icon: Calendar,
      color: "bg-info/10 text-info",
    },
    {
      label: "Faturamento",
      value: "R$ 1.850",
      change: "+15% vs ontem",
      icon: DollarSign,
      color: "bg-success/10 text-success",
    },
    {
      label: "Estoque Baixo",
      value: "5",
      change: "Produtos",
      icon: Package,
      color: "bg-warning/10 text-warning",
    },
  ];

  const upcomingAppointments = [
    { time: "09:00", pet: "Thor", service: "Banho + Tosa", owner: "Maria Silva", type: "dog" },
    { time: "10:30", pet: "Luna", service: "Banho", owner: "João Santos", type: "cat" },
    { time: "11:00", pet: "Max", service: "Tosa Higiênica", owner: "Ana Costa", type: "dog" },
    { time: "14:00", pet: "Bella", service: "Banho + Tosa", owner: "Pedro Lima", type: "dog" },
  ];

  const recentSales = [
    { product: "Ração Premium 15kg", quantity: 2, total: "R$ 340,00" },
    { product: "Shampoo Antipulgas", quantity: 1, total: "R$ 45,00" },
    { product: "Coleira Antipulgas", quantity: 3, total: "R$ 180,00" },
  ];

  return (
    <DashboardLayout 
      title="Olá! 👋" 
      subtitle="Aqui está um resumo do seu petshop hoje"
    >
      <div className="space-y-8 animate-fade-in">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </Button>
          <Button variant="secondary" className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Venda
          </Button>
          <Button variant="secondary" className="gap-2">
            <Users className="w-4 h-4" />
            Cadastrar Cliente
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {todayStats.map((stat) => (
            <div
              key={stat.label}
              className="card-metric group hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="card-elevated">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Próximos Agendamentos</h3>
                  <p className="text-sm text-muted-foreground">Hoje</p>
                </div>
              </div>
              <Link to="/agenda">
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="p-2">
              {upcomingAppointments.map((apt, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-14 text-center">
                    <div className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      {apt.time}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    {apt.type === "dog" ? (
                      <Dog className="w-5 h-5 text-secondary-foreground" />
                    ) : (
                      <Cat className="w-5 h-5 text-secondary-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{apt.pet}</p>
                    <p className="text-sm text-muted-foreground truncate">{apt.owner}</p>
                  </div>
                  <span className="badge-status badge-info">{apt.service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sales */}
          <div className="card-elevated">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Vendas Recentes</h3>
                  <p className="text-sm text-muted-foreground">Últimas transações</p>
                </div>
              </div>
              <Link to="/vendas">
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  Ver todas <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="p-2">
              {recentSales.map((sale, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{sale.product}</p>
                      <p className="text-sm text-muted-foreground">Qtd: {sale.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-success">{sale.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="card-elevated p-5 border-l-4 border-l-warning">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">⚠️ Atenção! Estoque Baixo</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Alguns produtos precisam de reposição para evitar falta.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge-status badge-warning">Ração Premium - 3 unid.</span>
                <span className="badge-status badge-warning">Shampoo Neutro - 2 unid.</span>
                <span className="badge-status badge-warning">Coleira M - 1 unid.</span>
              </div>
            </div>
            <Link to="/estoque">
              <Button variant="outline" size="sm">
                Ver Estoque
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
