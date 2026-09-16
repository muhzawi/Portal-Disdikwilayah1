import { BookOpen, ClipboardList, FileText, ShieldCheck } from "lucide-react";

const applications = [
  {
    id: "e-arsip",
    name: "E-Arsip",
    category: "Administrasi",
    description: "Kelola arsip digital secara aman dan terstruktur.",
    icon: FileText,
    status: "available",
    version: "1.0.0",
    url: "https://example.com/e-arsip",
  },
  {
    id: "akademik",
    name: "Akademik",
    category: "Pendidikan",
    description: "Akses informasi akademik dalam satu dashboard.",
    icon: BookOpen,
    status: "available",
    version: "2.4.1",
    url: "https://example.com/akademik",
  },
  {
    id: "inventaris",
    name: "Inventaris",
    category: "Administrasi",
    description: "Pantau aset dan inventaris sekolah dengan mudah.",
    icon: ClipboardList,
    status: "maintenance",
    version: "1.8.0",
    url: "https://example.com/inventaris",
  },
  {
    id: "kepegawaian",
    name: "Kepegawaian",
    category: "Kepegawaian",
    description: "Informasi data dan layanan kepegawaian.",
    icon: ShieldCheck,
    status: "available",
    version: "1.2.0",
    url: "https://example.com/kepegawaian",
  },
];

export default applications;
