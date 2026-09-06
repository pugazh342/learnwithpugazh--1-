import { ArrowRight, Server, Globe, Monitor, Shield, Layers } from 'lucide-react';

interface DiagramProps {
  type: 'dns-flow' | 'vlan-frame' | 'osi-stack' | 'routing-table' | 'generic';
}

export function TechnicalDiagram({ type }: DiagramProps) {
  if (type === 'dns-flow') {
    return (
      <div id="diagram-dns-flow" className="my-6 p-5 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="text-xs font-mono uppercase tracking-wider text-[#667085] mb-4">
          Visual Diagram: Recursive vs Iterative DNS Resolution Sequence
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs flex flex-col items-center justify-center">
            <Monitor className="w-6 h-6 text-[#4F46E5] mb-2" />
            <div className="text-xs font-semibold text-[#111827]">Client Machine</div>
            <div className="text-[11px] text-[#667085]">192.168.1.100</div>
            <div className="mt-2 text-[10px] bg-[#EEF2FF] text-[#4F46E5] font-mono px-2 py-0.5 rounded-sm">
              "What is google.com?"
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#4F46E5]/30 bg-[#EEF2FF]/40 shadow-2xs flex flex-col items-center justify-center">
            <Server className="w-6 h-6 text-[#4F46E5] mb-2" />
            <div className="text-xs font-semibold text-[#111827]">Recursive Resolver</div>
            <div className="text-[11px] text-[#667085]">e.g. 1.1.1.1 / 8.8.8.8</div>
            <div className="mt-2 text-[10px] bg-[#16A34A]/10 text-[#16A34A] font-mono px-2 py-0.5 rounded-sm">
              Handles iterative walk
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs flex flex-col items-center justify-center">
            <Globe className="w-6 h-6 text-[#2563EB] mb-2" />
            <div className="text-xs font-semibold text-[#111827]">Root & TLD Servers</div>
            <div className="text-[11px] text-[#667085]">Root (.) &gt; .com TLD</div>
            <div className="mt-2 text-[10px] bg-[#F3F4F6] text-[#4B5563] font-mono px-2 py-0.5 rounded-sm">
              "Ask Authoritative NS"
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs flex flex-col items-center justify-center">
            <Shield className="w-6 h-6 text-[#16A34A] mb-2" />
            <div className="text-xs font-semibold text-[#111827]">Authoritative NS</div>
            <div className="text-[11px] text-[#667085]">ns1.google.com</div>
            <div className="mt-2 text-[10px] bg-[#F0FDF4] text-[#16A34A] font-mono px-2 py-0.5 rounded-sm">
              "A = 142.250.190.46"
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between text-xs text-[#667085] gap-2">
          <span>1. Recursive query sent to resolver</span>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] hidden md:block" />
          <span>2. Iterative search through Root & TLD</span>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] hidden md:block" />
          <span>3. Authoritative answer cached & returned</span>
        </div>
      </div>
    );
  }

  if (type === 'vlan-frame') {
    return (
      <div id="diagram-vlan-frame" className="my-6 p-5 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="text-xs font-mono uppercase tracking-wider text-[#667085] mb-3">
          IEEE 802.1Q Encapsulated Ethernet Frame
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-1 text-center font-mono text-xs">
          <div className="p-2.5 rounded-lg border border-[#D1D5DB] bg-[#FFFFFF] flex-1">
            <div className="text-[#111827] font-semibold">Dest MAC</div>
            <div className="text-[10px] text-[#667085]">6 Bytes</div>
          </div>
          <div className="p-2.5 rounded-lg border border-[#D1D5DB] bg-[#FFFFFF] flex-1">
            <div className="text-[#111827] font-semibold">Src MAC</div>
            <div className="text-[10px] text-[#667085]">6 Bytes</div>
          </div>
          <div className="p-2.5 rounded-lg border-2 border-[#4F46E5] bg-[#EEF2FF] flex-2 shadow-xs">
            <div className="text-[#4F46E5] font-bold">802.1Q Tag (4 Bytes)</div>
            <div className="text-[10px] text-[#4338CA]">TPID (0x8100) | PCP | DEI | VID (12b)</div>
          </div>
          <div className="p-2.5 rounded-lg border border-[#D1D5DB] bg-[#FFFFFF] flex-1">
            <div className="text-[#111827] font-semibold">EtherType</div>
            <div className="text-[10px] text-[#667085]">2 Bytes</div>
          </div>
          <div className="p-2.5 rounded-lg border border-[#D1D5DB] bg-[#FFFFFF] flex-3">
            <div className="text-[#111827] font-semibold">IP Payload / Data</div>
            <div className="text-[10px] text-[#667085]">46 - 1500 Bytes</div>
          </div>
          <div className="p-2.5 rounded-lg border border-[#D1D5DB] bg-[#FFFFFF] flex-1">
            <div className="text-[#111827] font-semibold">FCS / CRC</div>
            <div className="text-[10px] text-[#667085]">4 Bytes</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-[#667085]">
          The 4-byte 802.1Q header is inserted directly after the Source MAC address on trunk links and stripped by access ports before packet delivery to client workstations.
        </p>
      </div>
    );
  }

  // fallback generic / topology diagram
  return (
    <div id="diagram-generic" className="my-6 p-5 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA]">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#667085] mb-3">
        <Layers className="w-4 h-4 text-[#4F46E5]" />
        <span>Architectural Flow Representation</span>
      </div>
      <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] flex flex-col md:flex-row items-center justify-around gap-4 text-center">
        <div className="p-3 rounded-lg border border-[#E5E7EB] w-full md:w-44">
          <div className="text-xs font-semibold text-[#111827]">Ingress Interface</div>
          <div className="text-[11px] text-[#667085] mt-1 font-mono">Packet Ingest</div>
        </div>
        <ArrowRight className="w-5 h-5 text-[#9CA3AF] shrink-0" />
        <div className="p-3 rounded-lg border border-[#4F46E5] bg-[#EEF2FF] w-full md:w-48">
          <div className="text-xs font-semibold text-[#4F46E5]">Processing &amp; Lookup</div>
          <div className="text-[11px] text-[#4338CA] mt-1 font-mono">Table / State Machine</div>
        </div>
        <ArrowRight className="w-5 h-5 text-[#9CA3AF] shrink-0" />
        <div className="p-3 rounded-lg border border-[#E5E7EB] w-full md:w-44">
          <div className="text-xs font-semibold text-[#111827]">Egress Forwarding</div>
          <div className="text-[11px] text-[#667085] mt-1 font-mono">Outbound Delivery</div>
        </div>
      </div>
    </div>
  );
}
