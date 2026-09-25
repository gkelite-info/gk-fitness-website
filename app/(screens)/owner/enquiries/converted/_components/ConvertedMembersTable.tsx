import { InstagramLogo, GoogleLogo, FacebookLogo, User, PersonSimpleWalk, ShareNetwork } from "@phosphor-icons/react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/app/(screens)/components/reusable/table";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  addedVia: string;
  plan: string;
  date: string;
}

interface ConvertedMembersTableProps {
  members: Member[];
}

export default function ConvertedMembersTable({ members }: ConvertedMembersTableProps) {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar flex-1">
      <Table className="w-full min-w-[900px]">
        <TableHeader className="bg-[#111723] border-b border-[#1F2738]">
          <TableRow className="border-none hover:bg-transparent">
            <TableCell className="font-sans font-bold text-[10px] text-[#64748B] tracking-wider uppercase py-4 pl-6">#</TableCell>
            <TableCell className="font-sans font-bold text-[10px] text-[#64748B] tracking-wider uppercase py-4">Member Name</TableCell>
            <TableCell className="font-sans font-bold text-[10px] text-[#64748B] tracking-wider uppercase py-4">Email</TableCell>
            <TableCell className="font-sans font-bold text-[10px] text-[#64748B] tracking-wider uppercase py-4">Phone</TableCell>
            <TableCell className="font-sans font-bold text-[10px] text-[#64748B] tracking-wider uppercase py-4">Original Source</TableCell>
            <TableCell className="font-sans font-bold text-[10px] text-[#64748B] tracking-wider uppercase py-4">Added Via</TableCell>
            <TableCell className="font-sans font-bold text-[10px] text-[#64748B] tracking-wider uppercase py-4">Selected Plan</TableCell>
            <TableCell className="font-sans font-bold text-[10px] text-[#64748B] tracking-wider uppercase py-4 pr-6">Converted On</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="border-b border-[#1F2738]/50 hover:bg-white/[0.02] transition-colors group">
              <TableCell className="py-4 pl-6">
                <span className="font-mono text-xs text-[#64748B]">0{member.id}</span>
              </TableCell>
              <TableCell className="py-4">
                <span className="font-sans font-bold text-xs text-white">{member.name}</span>
              </TableCell>
              <TableCell className="py-4">
                <span className="font-mono text-xs text-[#94A3B8]">{member.email}</span>
              </TableCell>
              <TableCell className="py-4">
                <span className="font-mono text-xs text-[#94A3B8]">{member.phone}</span>
              </TableCell>
              <TableCell className="py-4">
                {member.source === "Instagram" && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-fuchsia-950/40 border border-fuchsia-600/30 rounded-full w-fit">
                    <InstagramLogo size={12} className="text-[#E1306C]" />
                    <span className="font-sans font-medium text-[11px] text-[#E1306C]">Instagram</span>
                  </div>
                )}
                {member.source === "Google" && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-950/40 border border-blue-600/30 rounded-full w-fit">
                    <GoogleLogo size={12} className="text-[#3B82F6]" />
                    <span className="font-sans font-medium text-[11px] text-[#3B82F6]">Google</span>
                  </div>
                )}
                {member.source === "Facebook" && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-950/40 border border-blue-600/30 rounded-full w-fit">
                    <FacebookLogo size={12} weight="fill" className="text-[#3B82F6]" />
                    <span className="font-sans font-medium text-[11px] text-[#3B82F6]">Facebook</span>
                  </div>
                )}
                {member.source === "Referral" && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-950/40 border border-purple-600/30 rounded-full w-fit">
                    <User size={12} weight="fill" className="text-[#A855F7]" />
                    <span className="font-sans font-medium text-[11px] text-[#A855F7]">Referral</span>
                  </div>
                )}
                {member.source === "Walk-in" && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/40 border border-emerald-600/30 rounded-full w-fit">
                    <PersonSimpleWalk size={12} className="text-[#34D399]" />
                    <span className="font-sans font-medium text-[11px] text-[#34D399]">Walk-in</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="py-4">
                {member.addedVia === "Social Media" ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/30 border border-emerald-500/30 rounded-full w-fit">
                    <ShareNetwork size={12} className="text-[#34D399]" />
                    <span className="font-sans font-medium text-[11px] text-[#34D399]">Social Media</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/30 border border-amber-600/30 rounded-full w-fit">
                    <User size={12} weight="fill" className="text-[#F59E0B]" />
                    <span className="font-sans font-medium text-[11px] text-[#F59E0B]">Owner Added</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="py-4">
                <span className="font-sans text-xs text-[#CBD5E1]">{member.plan}</span>
              </TableCell>
              <TableCell className="py-4 pr-6">
                <span className="font-sans text-xs text-[#94A3B8]">{member.date}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
