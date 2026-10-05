import { ArrowDown, ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, Bell, Bike, BookOpen, BriefcaseBusiness, CalendarDays, Check, CheckCheck, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Circle, CircleAlert, CircleHelp, Clock3, CloudRain, Download, Droplet, Ellipsis, ExternalLink, FileCheck2, FileText, Filter, Flag, Fuel, Gauge, History, Info, Layers3, Link2, ListChecks, Menu, Mountain, Pencil, Plus, Printer, RotateCcw, Route, Search, Settings2, ShieldCheck, SlidersHorizontal, Sparkles, Trash2, Upload, UserRound, Waves, Wind, Wrench, X, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BellRing, Globe2, Monitor, Moon, RefreshCw, Send, Smartphone, WifiOff } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  arrow: ArrowRight, left: ArrowLeft, down: ArrowDown, external: ArrowUpRight, link: ExternalLink,
  chevron: ChevronRight, 'chevron-down': ChevronDown, 'chevron-left': ChevronLeft, bell: Bell,
  bike: Bike, book: BookOpen, briefcase: BriefcaseBusiness, calendar: CalendarDays,
  check: Check, checks: CheckCheck, 'check-circle': CheckCircle2, circle: Circle,
  alert: CircleAlert, help: CircleHelp, clock: Clock3, rain: CloudRain, download: Download,
  save: ArrowDownToLine, droplet: Droplet, more: Ellipsis, file: FileText, verified: FileCheck2,
  filter: Filter, flag: Flag, fuel: Fuel, gauge: Gauge, history: History, info: Info,
  layers: Layers3, chain: Link2, checklist: ListChecks, menu: Menu, mountain: Mountain,
  edit: Pencil, plus: Plus, print: Printer, reset: RotateCcw, route: Route, search: Search,
  settings: Settings2, sliders: SlidersHorizontal, shield: ShieldCheck, spark: Sparkles,
  trash: Trash2, upload: Upload, user: UserRound, waves: Waves, wind: Wind, wrench: Wrench,
  close: X, zap: Zap, 'bell-ring': BellRing, globe: Globe2, monitor: Monitor,
  moon: Moon, refresh: RefreshCw, send: Send, smartphone: Smartphone, 'wifi-off': WifiOff,
};

export function Icon({ name, size = 20, className = '', strokeWidth = 1.7 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const Component = icons[name] || Circle;
  return <Component size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return <div className={`brand-lockup ${compact ? 'compact' : ''}`}>
    <svg viewBox="0 0 38 40" width="34" height="36" aria-hidden="true"><path d="m23 2-6 13h13L8 38l8-18H5Z" fill="currentColor" /><path d="m26 3 8 0-8 9h-5Z" fill="currentColor" opacity=".4" /></svg>
    {!compact && <div><strong>bros<span>.</span></strong><small>SEU CAMINHO EM DIA</small></div>}
  </div>;
}