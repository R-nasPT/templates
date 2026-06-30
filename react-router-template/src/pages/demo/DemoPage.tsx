import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Layers,
  Package,
  Route,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Separator } from '@/shared/components/ui/Separator';

const stats = [
  {
    label: 'UI Components',
    value: '12+',
    icon: Layers,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Lazy Routes',
    value: '100%',
    icon: Route,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    label: 'Type Safe',
    value: 'TS',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Bundle Size',
    value: '~45kb',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
];

const stack = [
  {
    name: 'React Router v7',
    description: 'Lazy loading, middleware, type-safe routes พร้อม modern API',
    icon: Route,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    name: 'Tailwind CSS v4',
    description: 'Utility-first styling พร้อม OKLCH design tokens แบบ custom',
    icon: Sparkles,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    name: 'shadcn/ui',
    description: 'Accessible component library บน Radix / Base UI',
    icon: Layers,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
  },
  {
    name: 'TanStack Query',
    description: 'Async state management พร้อม caching, sync และ devtools',
    icon: Activity,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    name: 'Zustand',
    description: 'Global state management เบาและเร็ว พร้อม devtools',
    icon: Package,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    name: 'Keycloak Auth',
    description: 'Enterprise SSO พร้อม PKCE, token refresh และ role-based access',
    icon: Shield,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
  },
];

export default function DemoPage() {
  return (
    <div className="flex flex-col gap-8">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-sidebar to-primary p-8 text-white shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.7_0.18_260/0.15),transparent_60%)]" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white/20">
                <Sparkles className="size-4" />
              </div>
              <span className="text-sm font-medium text-white/80">Project Template</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Start · Build · Ship
            </h1>
            <p className="max-w-md text-sm text-white/70">
              Production-ready React template พร้อม auth, routing, state management
              และ UI components ครบครัน — เริ่มต้นได้ทันที
            </p>
          </div>
          <Button
            variant="outline"
            className="w-fit border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-3 pt-4">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <p className="text-sm text-muted-foreground">
            เครื่องมือที่ใช้ใน template นี้ทั้งหมด
          </p>
        </div>
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stack.map((item) => (
            <Card key={item.name}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                    <item.icon className={`size-4 ${item.color}`} />
                  </div>
                  <CardTitle className="text-sm">{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>พร้อมเริ่มต้น?</CardTitle>
          <CardDescription>
            แก้ไข <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">src/features/</code> แล้วเพิ่ม feature แรกของคุณได้เลย
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">
              <Sparkles className="size-4" />
              New Feature
            </Button>
            <Button size="sm" variant="outline">
              View Docs
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
