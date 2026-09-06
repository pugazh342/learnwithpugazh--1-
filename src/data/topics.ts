import { Topic } from '../types';

export const topics: Record<string, Topic> = {
  dns: {
    id: 'topic-dns',
    title: 'Domain Name System (DNS)',
    slug: 'dns',
    category: 'Networking',
    categorySlug: 'networking',
    groupName: 'Network Services',
    description: 'The hierarchical, distributed database system that translates human-readable domain names into machine-routable IP addresses.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min read',
    prerequisites: ['IP Addressing & Subnets', 'Client-Server Model', 'UDP & TCP Transport Basics'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Real-World Example' },
      { id: 'practical', label: '06 Practical Commands' },
      { id: 'troubleshooting', label: '07 Troubleshooting Guide' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: '01 Concept: The Internet\'s Phonebook',
        content: `At its core, the **Domain Name System (DNS)** is a global, hierarchically organized, distributed directory service. While human beings identify web resources and mail endpoints through memorable names like \`api.github.com\` or \`google.com\`, routers and switches at the IP layer only understand 32-bit (IPv4) or 128-bit (IPv6) numerical destinations.

DNS bridges this cognitive gap without requiring a single centralized server—a design that would represent an intolerable single point of failure and bottleneck for global traffic. Instead, DNS delegates authority across a worldwide tree of authoritative nameservers.`,
        callout: {
          type: 'info',
          title: 'Standard Port & Transport',
          message: 'Standard DNS queries use UDP port 53 for speed and low overhead. When query responses exceed 512 bytes (or with DNSSEC / zone transfers AXFR), DNS falls back seamlessly to TCP port 53.'
        }
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters in Production',
        content: `DNS is frequently cited as the root cause of high-profile global internet outages. When DNS fails, even if your underlying application servers, database clusters, and physical fiber links are 100% operational, users perceive your service as completely offline.

Furthermore, modern cloud infrastructure relies on DNS for far more than basic name lookups:
- **Global Server Load Balancing (GSLB):** Geo-DNS resolves user queries to the nearest physical edge POP (Point of Presence).
- **Service Discovery in Kubernetes:** Internal CoreDNS clusters resolve microservice endpoints dynamically as pods scale and recycle.
- **Failover & Blue-Green Deployments:** Weighted DNS records shift production user percentages gracefully without changing code.`,
        table: {
          headers: ['Record Type', 'Purpose', 'Example Payload'],
          rows: [
            ['A', 'Maps hostname to IPv4 address', '93.184.216.34'],
            ['AAAA', 'Maps hostname to 128-bit IPv6 address', '2606:2800:220:1:248:1893:25c8:1946'],
            ['CNAME', 'Canonical alias pointing to another hostname', 'docs.example.com -> cdn.cloudflare.net'],
            ['MX', 'Mail Exchange server priority and target', '10 mail.example.com'],
            ['TXT', 'Arbitrary text for SPF, DKIM, site verification', 'v=spf1 include:_spf.google.com ~all'],
            ['PTR', 'Pointer record for reverse DNS lookups (IP to name)', '34.216.184.93.in-addr.arpa -> example.com']
          ]
        }
      },
      {
        id: 'how-it-works',
        title: '03 How It Works: The Iterative Resolution Chain',
        content: `When a client initiates a lookup that is not already cached locally, an iterative query progression unfolds through four distinct server roles:

1. **DNS Recursive Resolver (e.g. 1.1.1.1, 8.8.8.8, ISP Resolver):** The workhorse that accepts queries from the client and handles the multi-step resolution on their behalf.
2. **Root Nameservers (.\):** 13 logical root server identities (named a.root-servers.net through m.root-servers.net, backed by hundreds of Anycast nodes). They direct queries to the appropriate TLD nameservers.
3. **TLD Nameservers (.com, .org, .net, .io):** Managed by registries (such as Verisign for .com). They maintain authority for the top-level extension and return the authoritative nameservers for the target second-level domain.
4. **Authoritative Nameserver (e.g. ns1.digitalocean.com, Route53):** The final source of truth that holds the actual DNS zone file and answers definitively with the resource record.`,
        codeBlock: {
          language: 'txt',
          caption: 'Hierarchical query breakdown for api.internal.company.com',
          code: `Client -> Recursive Resolver (Cache Miss)
  -> Root Server (.)          -> "Go ask .com TLD at 192.5.6.30"
  -> TLD Server (.com)        -> "Go ask company.com NS at 205.251.192.1"
  -> Authoritative NS         -> "api.internal.company.com is 10.0.4.52 (TTL 300)"
Resolver caches result and returns 10.0.4.52 to Client.`
        }
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Explanation: The Resolution Loop',
        content: `Observe the separation of responsibilities: the client asks a **recursive** question ("Please find this IP for me and give me the answer"), while the recursive resolver asks **iterative** questions ("Do you know this IP? No? Point me to whoever knows next").`,
        diagramType: 'dns-flow'
      },
      {
        id: 'example',
        title: '05 Real-World Example: Tracing a Domain Step-by-Step',
        content: `We can inspect every link in the delegation chain using the \`dig +trace\` utility. Notice how the response starts at the root hints and traverses through the TLD before arriving at the authoritative answer.`,
        codeBlock: {
          language: 'bash',
          caption: 'Tracing resolution with dig',
          code: `# Run an iterative trace without using local cache
$ dig +trace learnwithpugazh.dev

; <<>> DiG 9.10.6 <<>> +trace learnwithpugazh.dev
;; global options: +cmd
.                       518400  IN  NS  a.root-servers.net.
.                       518400  IN  NS  b.root-servers.net.
;; Received 525 bytes from 192.168.1.1#53(192.168.1.1) in 12 ms

dev.                    172800  IN  NS  a.nic.google.
dev.                    172800  IN  NS  b.nic.google.
;; Received 450 bytes from 198.41.0.4#53(a.root-servers.net) in 24 ms

learnwithpugazh.dev.    10800   IN  NS  ns1.cloudflare.com.
learnwithpugazh.dev.    10800   IN  NS  ns2.cloudflare.com.
;; Received 380 bytes from 216.239.32.105#53(a.nic.google) in 19 ms

learnwithpugazh.dev.    300     IN  A   76.76.21.21
;; Received 74 bytes from 172.64.32.123#53(ns1.cloudflare.com) in 8 ms`
        }
      },
      {
        id: 'practical',
        title: '06 Practical Commands for Network Engineers',
        content: `Here are the essential daily inspection commands every developer and systems administrator must know:`,
        codeBlock: {
          language: 'bash',
          caption: 'Querying specific record types and bypassing local resolver',
          code: `# 1. Query A Record using a specific public recursive resolver (Cloudflare 1.1.1.1)
dig @1.1.1.1 learnwithpugazh.dev A +noall +answer

# 2. Check Mail Exchange (MX) records
dig learnwithpugazh.dev MX +short

# 3. Check SPF and TXT verification strings
dig learnwithpugazh.dev TXT +short

# 4. Reverse DNS lookup on an IP address
dig -x 8.8.8.8 +short
# Output: dns.google.

# 5. Flush local operating system DNS cache
# macOS:
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
# Linux (systemd-resolved):
sudo resolvectl flush-caches`
        }
      },
      {
        id: 'troubleshooting',
        title: '07 Troubleshooting Guide: Common Failure Modes',
        content: `When DNS fails, isolate the layer methodically:`,
        callout: {
          type: 'warning',
          title: 'The Stale Cache & TTL Trap',
          message: 'TTL (Time To Live) determines how many seconds intermediate resolvers cache a record. Before a planned migration or IP cutover, proactively reduce your record TTL to 300 seconds (5 minutes) 48 hours in advance.'
        },
        table: {
          headers: ['Symptom', 'Likely Cause', 'Diagnostic Step', 'Remediation'],
          rows: [
            ['NXDOMAIN response', 'Domain does not exist or typo in subdomain', 'dig <domain> +all', 'Verify registrar nameservers and spelling in zone file'],
            ['SERVFAIL response', 'DNSSEC validation failure or authoritative timeout', 'dig +cd <domain> (checking disabled)', 'Audit RRSIG expiry dates or check authoritatives firewall'],
            ['Old IP returned after migration', 'Stale cache honoring high TTL', 'dig @authoritative-ns <domain>', 'Flush local cache; wait for TTL expiration window'],
            ['Lookup succeeds for IP but fails for hostname', 'Local resolver offline or misconfigured in /etc/resolv.conf', 'ping 8.8.8.8 vs ping google.com', 'Update /etc/resolv.conf with valid nameserver entry']
          ]
        }
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: 'Test your mental model of DNS resolution before moving to the hands-on lab.',
        callout: {
          type: 'tip',
          title: 'Engineering Scenario',
          message: 'If an authoritative nameserver updates an A record from 1.1.1.1 to 2.2.2.2 with a TTL of 3600 seconds, what IP will a user see if their recursive resolver cached the previous record 25 minutes ago?'
        }
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'Continue your networking journey with these connected concepts and practical configurations.'
      }
    ],
    practicalSummary: 'Practice performing live DNS queries, inspecting TTL decrements, and testing fallback under resolver failure in our hands-on diagnostic lab.',
    labSlug: 'network-troubleshooting',
    labTitle: 'Network Troubleshooting & Packet Diagnostics',
    challenge: {
      question: 'A recursive resolver cached an A record with TTL=3600 seconds 25 minutes (1500 seconds) ago. The zone admin just updated the record to a new IP. What IP will a client querying that resolver receive, and for how much longer?',
      hint: 'Think about who holds the cache and whether the authoritative server pushes changes to third-party resolvers.',
      answer: 'The client will still receive the OLD IP for another 35 minutes (2100 seconds). Resolvers do not receive pushes from authoritative servers; they only refresh when their local TTL counter hits zero.'
    },
    relatedTopics: [
      { title: 'DHCP Protocol', slug: 'dhcp', categorySlug: 'networking', difficulty: 'Beginner' },
      { title: 'HTTP / HTTPS & TLS', slug: 'http-https', categorySlug: 'networking', difficulty: 'Intermediate' },
      { title: 'Wireshark Packet Analysis', slug: 'wireshark', categorySlug: 'networking', difficulty: 'Intermediate' }
    ],
    relatedLabs: [
      { title: 'Network Troubleshooting', slug: 'network-troubleshooting', difficulty: 'Intermediate' },
      { title: 'Wireshark Packet Analysis', slug: 'wireshark-packet-analysis', difficulty: 'Intermediate' }
    ],
    relatedProjects: [
      { title: 'Network Monitoring Dashboard', slug: 'network-monitoring-dashboard' }
    ],
    roadmap: {
      title: 'Networking Roadmap',
      slug: 'networking',
      stage: 'Network Services'
    },
    instagramPost: {
      title: 'What Happens When You Type google.com? (DNS in 60s)',
      handle: '@learnwithpugazh',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Visualizing recursive resolvers, root servers, and TLD lookup chains in one minute.'
    }
  },

  vlan: {
    id: 'topic-vlan',
    title: 'VLANs (Virtual Local Area Networks)',
    slug: 'vlan',
    category: 'Networking',
    categorySlug: 'networking',
    groupName: 'Switching & VLANs',
    description: 'Logically segmenting physical switches to divide broadcast domains, improve security, and optimize network bandwidth.',
    difficulty: 'Intermediate',
    estimatedTime: '12 min read',
    prerequisites: ['Ethernet Switching Basics', 'MAC Addresses & CAM Table', 'Broadcast Domains'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Real-World Example' },
      { id: 'practical', label: '06 Practical CLI Config' },
      { id: 'troubleshooting', label: '07 Troubleshooting' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: '01 Concept: Logical Boundaries on Shared Hardware',
        content: `By default, a physical Ethernet switch operates as a single **broadcast domain**. When a host transmits an ARP request or broadcast packet, the switch floods that frame out of every active port except the ingress port.

A **Virtual Local Area Network (VLAN)** partitions a physical switch into multiple isolated logical switches. Devices assigned to VLAN 10 cannot communicate at Layer 2 with devices in VLAN 20—even if they are plugged into adjacent RJ-45 ports on the exact same physical chassis. Layer 3 routing is required to pass traffic between them.`
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters in Enterprise Architecture',
        content: `Without VLANs, separating departments or environments would require purchasing separate physical switches and cabling for every group.
- **Broadcast Containment:** Stops broadcast storms from flooding entire buildings.
- **Security Boundaries:** Isolates guest Wi-Fi, payment processing (PCI-DSS), IoT cameras, and corporate servers.
- **Cost Efficiency:** Consolidates 10 logical networks onto single high-density 48-port switches.`
      },
      {
        id: 'how-it-works',
        title: '03 How It Works: IEEE 802.1Q Tagging',
        content: `Inside an access switch, frames travel untagged. However, when multiple VLANs must travel over a single cable between two switches (a **trunk link**), the transmitting switch inserts a 4-byte **802.1Q tag** into the Ethernet frame header:

- **TPID (Tag Protocol Identifier, 16 bits):** Set to 0x8100 to indicate an 802.1Q tagged frame.
- **PCP (Priority Code Point, 3 bits):** Quality of Service (QoS) classification (voice, video, best-effort).
- **DEI (Drop Eligible Indicator, 1 bit):** Discard indicator in congestion.
- **VID (VLAN Identifier, 12 bits):** Supports 4,096 total VLAN IDs (1–4094 usable).`,
        codeBlock: {
          language: 'txt',
          caption: 'Standard Ethernet vs 802.1Q Encapsulated Frame',
          code: `Standard Frame:
[ Preamble | Dest MAC | Src MAC | EtherType | Payload | FCS ]

802.1Q Tagged Frame:
[ Preamble | Dest MAC | Src MAC | 802.1Q Tag (4 Bytes) | EtherType | Payload | FCS ]
                                   ├─ TPID: 0x8100 (2 Bytes)
                                   ├─ PCP: QoS (3 bits)
                                   ├─ DEI: Drop Flag (1 bit)
                                   └─ VID: VLAN ID (12 bits: 1-4094)`
        }
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Explanation: Access Ports vs Trunk Ports',
        content: `Access ports strip the 802.1Q tag before delivering to the host PC. Trunk links preserve tags so both switches agree on traffic segregation.`,
        diagramType: 'vlan-frame'
      },
      {
        id: 'example',
        title: '05 Real-World Example: Office Network Segmentation',
        content: `A typical corporate campus divides traffic into dedicated subnets and VLANs:
- **VLAN 10 (Staff):** 192.168.10.0/24
- **VLAN 20 (Engineering):** 192.168.20.0/24
- **VLAN 30 (Guest Wi-Fi):** 172.16.0.0/22
- **VLAN 99 (Management):** 10.99.0.0/24`,
        callout: {
          type: 'warning',
          title: 'Native VLAN Security Warning',
          message: 'Always change the default native VLAN away from VLAN 1 to prevent VLAN hopping attacks (Double Tagging). Never carry user data on the native VLAN.'
        }
      },
      {
        id: 'practical',
        title: '06 Practical Switch Configuration (Cisco IOS)',
        content: `Configuring access and trunk interfaces on a modern switch:`,
        codeBlock: {
          language: 'bash',
          caption: 'Cisco IOS VLAN & Trunk configuration',
          code: `Switch# configure terminal

! 1. Create the VLAN database entries
Switch(config)# vlan 10
Switch(config-vlan)# name SALES_DEPT
Switch(config-vlan)# vlan 20
Switch(config-vlan)# name DEV_DEPT
Switch(config-vlan)# exit

! 2. Assign client access ports
Switch(config)# interface FastEthernet 0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
Switch(config-if)# exit

! 3. Configure the uplink trunk to core switch
Switch(config)# interface GigabitEthernet 0/1
Switch(config-if)# switchport trunk encapsulation dot1q
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,99
Switch(config-if)# switchport trunk native vlan 99`
        }
      },
      {
        id: 'troubleshooting',
        title: '07 Troubleshooting Checklist',
        content: `When two hosts in the same VLAN cannot ping each other across switches:
1. Run \`show vlan brief\` on both switches: Verify the VLAN exists and is active.
2. Run \`show interfaces trunk\`: Verify the interconnecting link is in trunking mode.
3. Check Allowed VLAN list: Ensure your target VLAN has not been filtered out by \`switchport trunk allowed vlan\`.
4. Check Native VLAN mismatch: Native VLAN must match on both ends of a trunk link, or CDP will raise \`%CDP-4-NATIVE_VLAN_MISMATCH\`.`
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: 'Why does an end-user PC network card never see an 802.1Q tag during standard operation?',
        callout: {
          type: 'tip',
          title: 'Conceptual Hint',
          message: 'Consider what the switch access port does right before pushing electrical signals onto the copper cable to the client.'
        }
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'VLANs are only half the picture—learn how to route between them in the lab below.'
      }
    ],
    practicalSummary: 'Spin up Cisco Packet Tracer to build a dual-switch topology, configure access ports, verify 802.1Q trunks, and isolate department broadcasts.',
    labSlug: 'configure-vlans',
    labTitle: 'Configure VLANs & Trunk Links',
    challenge: {
      question: 'Why does an end-user PC network card never see an 802.1Q tag during standard operation?',
      hint: 'Think about switch access port ingress vs egress behavior.',
      answer: 'Access ports automatically strip the 4-byte 802.1Q tag on egress (outbound toward the PC) and re-insert the tag on ingress (inbound from the PC). Standard client NICs expect standard untagged Ethernet frames.'
    },
    relatedTopics: [
      { title: 'Inter-VLAN Routing', slug: 'inter-vlan-routing-topic', categorySlug: 'networking', difficulty: 'Intermediate' },
      { title: 'Ethernet Switching', slug: 'ethernet-switching', categorySlug: 'networking', difficulty: 'Beginner' },
      { title: 'Spanning Tree Protocol', slug: 'stp', categorySlug: 'networking', difficulty: 'Advanced' }
    ],
    relatedLabs: [
      { title: 'Configure VLANs', slug: 'configure-vlans', difficulty: 'Intermediate' },
      { title: 'Inter-VLAN Routing', slug: 'inter-vlan-routing', difficulty: 'Intermediate' }
    ],
    relatedProjects: [
      { title: 'Network Monitoring Dashboard', slug: 'network-monitoring-dashboard' }
    ],
    roadmap: {
      title: 'Networking Roadmap',
      slug: 'networking',
      stage: 'Switching & VLANs'
    },
    instagramPost: {
      title: 'VLANs Explained with an Office Analogy',
      handle: '@learnwithpugazh',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Why physical switches need logical dividers: 802.1Q explained visually.'
    }
  },

  ospf: {
    id: 'topic-ospf',
    title: 'OSPF Protocol (Open Shortest Path First)',
    slug: 'ospf',
    category: 'Networking',
    categorySlug: 'networking',
    groupName: 'Routing Protocols',
    description: 'An open-standard link-state interior gateway routing protocol utilizing Dijkstra\'s SPF algorithm for fast convergence and loop-free routing.',
    difficulty: 'Advanced',
    estimatedTime: '16 min read',
    prerequisites: ['IP Addressing & Subnetting', 'Static Routing Principles', 'Routing Information Protocol (RIP)'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Area 0 Architecture' },
      { id: 'practical', label: '06 Practical Config' },
      { id: 'troubleshooting', label: '07 Troubleshooting' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: '01 Concept: The Link-State Interior Gateway Protocol',
        content: `**OSPF (Open Shortest Path First)** is defined in RFC 2328 (OSPFv2 for IPv4) and RFC 5340 (OSPFv3 for IPv6). Unlike distance-vector protocols (such as RIP) where routers only exchange "routing tables by rumor" with immediate neighbors, every OSPF router builds a complete **topological map** of the entire network area.

Every router within an area holds an identical **Link-State Database (LSDB)**. Each router independently executes Dijkstra's Shortest Path First (SPF) algorithm on this LSDB, placing itself at the root of the tree to calculate the lowest-cost loop-free path to every known destination subnet.`
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters',
        content: `- **Sub-Second Convergence:** When a link flaps, routers only flood small Link-State Advertisements (LSAs) rather than full tables.
- **Hierarchical Area Design:** Prevents CPU exhaustion in huge enterprise networks by summarizing routes at Area Border Routers (ABRs).
- **Cost Metric based on Bandwidth:** Prefers high-speed 10Gbps fiber over 100Mbps copper links automatically.`
      },
      {
        id: 'how-it-works',
        title: '03 How It Works: The 7 Neighbor Adjacency States',
        content: `OSPF routers form neighbor relationships by exchanging multicast Hello packets (224.0.0.5) every 10 seconds. Routers progress through seven distinct states before passing routing traffic:

1. **Down:** No OSPF packets received.
2. **Init:** Received Hello packet from neighbor, but our own Router ID is not yet in their neighbor list.
3. **2-Way:** Bi-directional communication verified. DR/BDR election occurs on multi-access networks.
4. **ExStart:** Routers establish master/slave relationship and initial sequence numbers.
5. **Exchange:** Routers exchange Database Description (DBD) packets summarizing LSDB contents.
6. **Loading:** Routers send Link-State Requests (LSR) for missing LSAs and receive Link-State Updates (LSU).
7. **Full:** The LSDB is fully synchronized. Routers are adjacent and routes are installed.`
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Explanation: SPF Tree Calculation',
        content: `Every node calculates the shortest mathematical cost (Reference Bandwidth / Interface Bandwidth) to every leaf node.`,
        diagramType: 'routing-table'
      },
      {
        id: 'example',
        title: '05 Area 0 (Backbone Area) Architecture',
        content: `In multi-area OSPF, all non-backbone areas (e.g. Area 1, Area 2) must connect directly to **Area 0 (The Backbone)**. Traffic between non-backbone areas must traverse Area 0 to prevent inter-area routing loops.`,
        callout: {
          type: 'tip',
          title: 'Reference Bandwidth Formula',
          message: 'Default Cisco reference bandwidth is 100 Mbps (cost = 100 / BW). For modern Gigabit and 10G networks, always set: `auto-cost reference-bandwidth 10000` to avoid cost saturation.'
        }
      },
      {
        id: 'practical',
        title: '06 Practical OSPFv2 Configuration',
        content: `Configuring single-area OSPF with designated router IDs:`,
        codeBlock: {
          language: 'bash',
          caption: 'Cisco IOS OSPF single-area configuration',
          code: `Router-A# configure terminal
Router-A(config)# router ospf 1
Router-A(config-router)# router-id 1.1.1.1
Router-A(config-router)# auto-cost reference-bandwidth 10000

! Announce connected networks into Area 0 using wildcard masks
Router-A(config-router)# network 10.0.0.0 0.0.0.3 area 0
Router-A(config-router)# network 192.168.1.0 0.0.0.255 area 0

! Passive interface prevents OSPF chatter on user-facing LAN ports
Router-A(config-router)# passive-interface GigabitEthernet 0/0
Router-A(config-router)# exit`
        }
      },
      {
        id: 'troubleshooting',
        title: '07 Troubleshooting Neighbor Adjacencies',
        content: `If two routers are stuck in \`INIT\` or \`EXSTART\`:
- **Area ID Mismatch:** Both interfaces must belong to the exact same Area.
- **Subnet Mask Mismatch:** Subnet masks on interconnecting links must match.
- **Hello/Dead Timer Mismatch:** By default, Hello=10s and Dead=40s. Any divergence prevents 2-Way state.
- **MTU Mismatch:** Stuck in \`EXSTART/EXCHANGE\` usually indicates MTU mismatch on the link.`
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: 'Why does OSPF elect a Designated Router (DR) and Backup Designated Router (BDR) on Ethernet networks?',
        callout: {
          type: 'info',
          title: 'Adjacency Math',
          message: 'On an Ethernet switch with 10 routers, full-mesh adjacencies would require n*(n-1)/2 = 45 neighbor sessions. With a DR, how many are needed?'
        }
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'Test your understanding by spinning up our multi-router OSPF configuration lab.'
      }
    ],
    practicalSummary: 'Configure 3 routers in Packet Tracer, verify DR/BDR election, inspect `show ip ospf neighbor`, and simulate link failure convergence.',
    labSlug: 'ospf-configuration',
    labTitle: 'Multi-Router OSPF Configuration Lab',
    challenge: {
      question: 'Why does OSPF elect a Designated Router (DR) on multi-access Ethernet segments?',
      hint: 'Think about LSA flooding storm on a shared switch.',
      answer: 'To reduce the number of OSPF adjacencies and LSA flooding traffic. Instead of every router peering with every other router (n*(n-1)/2), all routers peer only with the DR/BDR, reducing adjacencies to 2*(n-2)+1.'
    },
    relatedTopics: [
      { title: 'Static Routing', slug: 'static-routing-topic', categorySlug: 'networking', difficulty: 'Beginner' },
      { title: 'Subnetting & CIDR', slug: 'subnetting', categorySlug: 'networking', difficulty: 'Intermediate' },
      { title: 'Access Control Lists (ACL)', slug: 'acl', categorySlug: 'networking', difficulty: 'Intermediate' }
    ],
    relatedLabs: [
      { title: 'OSPF Configuration', slug: 'ospf-configuration', difficulty: 'Advanced' },
      { title: 'Static Routing', slug: 'static-routing', difficulty: 'Intermediate' }
    ],
    relatedProjects: [
      { title: 'Network Monitoring Dashboard', slug: 'network-monitoring-dashboard' }
    ],
    roadmap: {
      title: 'Networking Roadmap',
      slug: 'networking',
      stage: 'Routing Protocols'
    },
    instagramPost: {
      title: 'OSPF vs RIP: Why Hop Count Died',
      handle: '@learnwithpugazh',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Why Dijkstra algorithm makes your internet packets 10x faster.'
    }
  },

  subnetting: {
    id: 'topic-subnetting',
    title: 'IPv4 Subnetting & CIDR',
    slug: 'subnetting',
    category: 'Networking',
    categorySlug: 'networking',
    groupName: 'Addressing & Subnetting',
    description: 'Master binary address partitioning, Variable Length Subnet Masking (VLSM), prefix lengths, and network boundaries.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min read',
    prerequisites: ['Binary Number System Basics', 'IPv4 Addressing Classes'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Fast Calculation Method' },
      { id: 'practical', label: '06 Practical Examples' },
      { id: 'troubleshooting', label: '07 Common Pitfalls' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: '01 Concept: Dividing Network Space',
        content: `Subnetting is the practice of dividing a single large physical or logical IP network into multiple smaller, distinct subnetworks.

An IPv4 address consists of 32 bits divided into four 8-bit octets. Every address contains two parts:
1. **Network Prefix:** Identifies which subnetwork the host belongs to.
2. **Host Identifier:** Identifies the specific machine or interface inside that subnetwork.

The **Subnet Mask** dictates exactly where the boundary between network bits and host bits lies.`
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters',
        content: `- **IPv4 Conservation:** Prevents wasting thousands of public IP addresses on small point-to-point links.
- **Traffic Isolation:** Restricts broadcast traffic to its intended subnetwork.
- **Hierarchical Routing:** Enables route summarization (CIDR aggregation) so core Internet routers don't drown in millions of individual host routes.`
      },
      {
        id: 'how-it-works',
        title: '03 How It Works: The "Magic Number" Method',
        content: `Forget slow binary conversions during real-time engineering work. Use the **Magic Number (Block Size)** technique:

1. Identify the "interesting octet" (the octet where the mask is neither 255 nor 0).
2. Calculate: \`Block Size = 256 - [Subnet Mask Octet]\`.
3. Count multiples of that block size to find subnet boundaries (0, Block, 2*Block, ...).
4. **Network ID:** The multiple equal to or immediately below your host IP.
5. **Broadcast IP:** One less than the next subnet's Network ID.
6. **Usable Range:** Network ID + 1 through Broadcast IP - 1.`
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Reference: Slash Notation Cheat Table',
        content: `Common slash notation masks and usable host counts:`,
        table: {
          headers: ['CIDR Prefix', 'Dotted Decimal Mask', 'Magic Block Size', 'Total IPs', 'Usable Hosts'],
          rows: [
            ['/24', '255.255.255.0', '256', '256', '254'],
            ['/25', '255.255.255.128', '128', '128', '126'],
            ['/26', '255.255.255.192', '64', '64', '62'],
            ['/27', '255.255.255.224', '32', '32', '30'],
            ['/28', '255.255.255.240', '16', '16', '14'],
            ['/29', '255.255.255.248', '8', '8', '6'],
            ['/30', '255.255.255.252', '4', '4', '2 (P2P Link)'],
            ['/31', '255.255.255.254', '2', '2', '2 (RFC 3021)'],
            ['/32', '255.255.255.255', '1', '1', '1 (Host Route)']
          ]
        }
      },
      {
        id: 'example',
        title: '05 Real-World Example: Sizing a 192.168.1.135/27 Host',
        content: `Let's analyze \`192.168.1.135/27\`:
- Mask: \`255.255.255.224\`
- Interesting octet: 4th octet (\`224\`)
- Block Size: \`256 - 224 = 32\`
- Subnet multiples: 0, 32, 64, 96, 128, 160, 192, 224
- Since 135 falls between 128 and 160:
  - **Network ID:** 192.168.1.128
  - **First Usable:** 192.168.1.129
  - **Last Usable:** 192.168.1.158
  - **Broadcast:** 192.168.1.159
  - **Next Subnet:** 192.168.1.160`
      },
      {
        id: 'practical',
        title: '06 Practical Subnetting CLI Commands',
        content: `Inspect subnets and route calculations on Linux:`,
        codeBlock: {
          language: 'bash',
          caption: 'ipcalc tool in Linux',
          code: `# Calculate complete subnet breakdown instantly with ipcalc
$ ipcalc 192.168.1.135/27

Address:   192.168.1.135        11000000.10101000.00000001.100 00111
Netmask:   255.255.255.224 = 27 11111111.11111111.11111111.111 00000
Wildcard:  0.0.0.31             00000000.00000000.00000000.000 11111
=>
Network:   192.168.1.128/27     11000000.10101000.00000001.100 00000
HostMin:   192.168.1.129
HostMax:   192.168.1.158
Broadcast: 192.168.1.159
Hosts/Net: 30`
        }
      },
      {
        id: 'troubleshooting',
        title: '07 Common Subnetting Traps',
        content: `- **Assigning the Network ID or Broadcast IP to a Host:** Assigning .128 or .159 in a /27 will cause OS interface validation errors.
- **Overlapping Subnets:** Forgetting to track VLSM allocations leading to routing clashes.
- **Off-by-one in Wildcard Masks:** Access lists use inverted masks (e.g. /27 has mask 255.255.255.224, wildcard is 0.0.0.31).`
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: 'You are allocated \`10.10.0.0/16\` and need 5 distinct branch offices with up to 500 computers each. What is the smallest subnet mask prefix (/X) that satisfies this requirement?'
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'Apply subnet allocation to realistic router configurations.'
      }
    ],
    practicalSummary: 'Practice allocating VLSM subnets across multi-site router topologies in our basic LAN setup lab.',
    labSlug: 'basic-lan',
    labTitle: 'Build a Basic LAN & IP Addressing',
    challenge: {
      question: 'You need to support up to 500 computers in a department. What is the minimum CIDR prefix length (/X) required?',
      hint: 'Use the formula 2^h - 2 >= 500 where h is the number of host bits.',
      answer: 'Prefix /23. With h=9 host bits, 2^9 - 2 = 510 usable host addresses. A /24 provides only 254 usable addresses.'
    },
    relatedTopics: [
      { title: 'IPv4 Addressing', slug: 'ipv4', categorySlug: 'networking', difficulty: 'Beginner' },
      { title: 'NAT & PAT', slug: 'nat', categorySlug: 'networking', difficulty: 'Intermediate' },
      { title: 'VLANs (Virtual LANs)', slug: 'vlan', categorySlug: 'networking', difficulty: 'Intermediate' }
    ],
    relatedLabs: [
      { title: 'Build a Basic LAN', slug: 'basic-lan', difficulty: 'Beginner' },
      { title: 'Configure VLANs', slug: 'configure-vlans', difficulty: 'Intermediate' }
    ],
    roadmap: {
      title: 'Networking Roadmap',
      slug: 'networking',
      stage: 'Addressing & Subnetting'
    },
    instagramPost: {
      title: 'Subnetting in 60 Seconds: The Magic Number Method',
      handle: '@learnwithpugazh',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Stop converting binary. Use block size math.'
    }
  },

  react: {
    id: 'topic-react',
    title: 'React Architecture & Virtual DOM',
    slug: 'react',
    category: 'Web Development',
    categorySlug: 'web-development',
    groupName: 'Modern React',
    description: 'Understand reconciliation, fiber trees, declarative UI synchronization, and high-performance component state machines.',
    difficulty: 'Intermediate',
    estimatedTime: '14 min read',
    prerequisites: ['Modern JavaScript (ES6+)', 'DOM API & Browser Painting', 'Functional Programming Basics'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Fiber Tree Example' },
      { id: 'practical', label: '06 Practical Patterns' },
      { id: 'troubleshooting', label: '07 Troubleshooting' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: '01 Concept: Declarative UI as a Function of State',
        content: `React shifted the frontend engineering paradigm from **imperative DOM manipulation** (\`document.createElement\`, \`appendChild\`, \`classList.add\`) to a **declarative model**: \`UI = f(State)\`.

You do not tell the browser step-by-step how to transition between states. Instead, you declare what the user interface should look like for a given state, and React determines the minimal set of real browser DOM mutations required to bring the screen into alignment.`
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters in Large Applications',
        content: `Real browser DOM operations are computationally expensive: modifying an element triggers style recalculations, layout reflow, and layer repainting across the browser rendering engine.

By performing tree-diffing algorithms in memory using lightweight JavaScript objects (the Virtual DOM), React batches and minimizes writes to the actual layout engine.`
      },
      {
        id: 'how-it-works',
        title: '03 How It Works: Reconciliation & The Fiber Architecture',
        content: `React 16 introduced the **Fiber reconciler**, a reimplementation of the core algorithm that turned synchronous recursive rendering into an asynchronous, interruptible work loop:

- **Render Phase:** React traverses fiber nodes in memory, evaluates components, computes differences, and marks effect tags. This phase is pure and can be paused, aborted, or prioritized.
- **Commit Phase:** React applies the calculated mutations to the host DOM synchronously in one single batch. Ref updates and layout effects execute here.`
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Explanation: Component Tree to Real DOM',
        content: `Every React element is compiled into a lightweight JavaScript object: \`{ type: 'div', props: { ... }, children: [...] }\`.`,
        codeBlock: {
          language: 'typescript',
          caption: 'What JSX compiles to under the hood',
          code: `// JSX written by developer:
const button = <button className="btn-primary" onClick={handleClick}>Save</button>;

// Compiled JavaScript (React 17+ JSX Transform):
import { jsx as _jsx } from 'react/jsx-runtime';
const button = _jsx('button', {
  className: 'btn-primary',
  onClick: handleClick,
  children: 'Save'
});`
        }
      },
      {
        id: 'example',
        title: '05 Clean State Machine Pattern in React',
        content: `Avoid boolean state explosion (isLoading, isError, isSuccess, isIdle) by modeling user flows as clean discriminated state unions:`,
        codeBlock: {
          language: 'typescript',
          caption: 'Type-safe UI state machine in React',
          code: `type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function UserProfile({ userId }: { userId: string }) {
  const [state, setState] = useState<FetchState<User>>({ status: 'idle' });

  // Pure exhaustive pattern matching
  switch (state.status) {
    case 'idle':
      return <button onClick={loadUser}>Load Profile</button>;
    case 'loading':
      return <Spinner label="Fetching user data..." />;
    case 'error':
      return <ErrorMessage text={state.error} />;
    case 'success':
      return <UserCard user={state.data} />;
  }
}`
        }
      },
      {
        id: 'practical',
        title: '06 Practical Component Rules',
        content: `- **Pure Renders:** Never cause side effects (network requests, localStorage writes) inside the component render body. Always isolate them inside \`useEffect\` or event handlers.
- **Key Stability:** Never use array index (\`key={index}\`) for items that can be inserted, deleted, or reordered. Use unique entity IDs.`
      },
      {
        id: 'troubleshooting',
        title: '07 Troubleshooting Infinite Re-Render Loops',
        content: `The dreaded \`Maximum update depth exceeded\` error occurs when state updates happen unconditionally during render:
- Triggered by passing an invoked function to an event handler: \`onClick={handleClick()}\` instead of \`onClick={handleClick}\`.
- Or including unstabilized objects or arrays inside \`useEffect\` dependency lists without \`useMemo\` or primitive comparison.`
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: 'Why does React require that component keys be stable across renders rather than generated via Math.random()?'
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'Pair React with TypeScript and build fullstack web applications.'
      }
    ],
    practicalSummary: 'Build an end-to-end interactive dashboard component with optimistic UI updates and custom hooks.',
    labSlug: 'build-a-rest-api',
    labTitle: 'Build a Fullstack REST API & React Client',
    challenge: {
      question: 'Why does React require component keys to remain stable across renders rather than generated dynamically with Math.random()?',
      hint: 'Think about how the reconciler knows which DOM nodes to preserve or tear down.',
      answer: 'If keys change randomly on every render, React treats every single child as completely new, unmounting the existing DOM node and destroying its internal state, focus, and inputs, causing severe performance drops and flickering.'
    },
    relatedTopics: [
      { title: 'TypeScript Foundations', slug: 'typescript', categorySlug: 'web-development', difficulty: 'Intermediate' },
      { title: 'RESTful API Design', slug: 'rest-api-design', categorySlug: 'web-development', difficulty: 'Beginner' }
    ],
    relatedLabs: [
      { title: 'Build a REST API', slug: 'build-a-rest-api', difficulty: 'Intermediate' }
    ],
    relatedProjects: [
      { title: 'Network Monitoring Dashboard', slug: 'network-monitoring-dashboard' }
    ],
    roadmap: {
      title: 'Web Development Roadmap',
      slug: 'web-development',
      stage: 'Modern React'
    },
    instagramPost: {
      title: 'Virtual DOM Explained in 60 Seconds',
      handle: '@learnwithpugazh',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Why React does not update the real browser DOM right away.'
    }
  },

  typescript: {
    id: 'topic-typescript',
    title: 'TypeScript Foundations & Type Systems',
    slug: 'typescript',
    category: 'Web Development',
    categorySlug: 'web-development',
    groupName: 'JavaScript & TypeScript',
    description: 'Static type checking, structural typing, generics, union narrowing, and building robust type-safe web systems.',
    difficulty: 'Intermediate',
    estimatedTime: '15 min read',
    prerequisites: ['Modern JavaScript', 'ES Modules'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Discriminated Unions' },
      { id: 'practical', label: '06 Practical Generics' },
      { id: 'troubleshooting', label: '07 Common Compiler Errors' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: '01 Concept: Static Analysis on Dynamic JavaScript',
        content: `JavaScript is dynamically and weakly typed: types are evaluated only at runtime when an interpreter executes a line of code.

**TypeScript** is a statically typed superset of JavaScript that compiles down to plain JavaScript. It performs compile-time verification without modifying runtime behavior or injecting overhead into production code bundles.`
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters in Production Teams',
        content: `- **Eliminates Null Reference Errors:** \`TypeError: Cannot read properties of undefined\` accounts for over 70% of production frontend bug reports.
- **Self-Documenting Codebase:** Function parameters, return signatures, and payload contracts are visible directly in the IDE.
- **Refactoring with Confidence:** Renaming an interface field flags every single broken reference across your entire repository before deployment.`
      },
      {
        id: 'how-it-works',
        title: '03 How It Works: Structural Subtyping (Duck Typing)',
        content: `TypeScript uses a **structural type system**, rather than a nominal one like Java or C#. Two types are compatible if they possess the same internal structure, regardless of their declared names.`,
        codeBlock: {
          language: 'typescript',
          caption: 'Structural compatibility example',
          code: `interface Point2D { x: number; y: number; }
interface Coordinates { x: number; y: number; label?: string; }

function plot(p: Point2D) {
  console.log(p.x, p.y);
}

const geo: Coordinates = { x: 42, y: 73, label: 'Origin' };
// Valid in TypeScript because geo satisfies Point2D shape!
plot(geo);`
        }
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Explanation: Type Widening & Narrowing',
        content: `Control flow analysis tracks variable types as they pass through runtime checks like \`typeof\`, \`instanceof\`, and equality guards.`,
        callout: {
          type: 'tip',
          title: 'Discriminated Unions',
          message: 'Adding a common literal property (e.g. `kind: "circle" | "square"`) allows TypeScript to narrow types exhaustively in a switch block without any type assertions.'
        }
      },
      {
        id: 'example',
        title: '05 Real-World Example: Type-Safe API Responses',
        content: `Model server payloads with strict error boundaries:`,
        codeBlock: {
          language: 'typescript',
          caption: 'Result pattern with TypeScript',
          code: `type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchTopic(slug: string): Promise<Result<Topic, string>> {
  try {
    const res = await fetch(\`/api/topics/\${slug}\`);
    if (!res.ok) return { success: false, error: 'Topic not found' };
    const data: Topic = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Network failure' };
  }
}`
        }
      },
      {
        id: 'practical',
        title: '06 Practical Tips: Avoid `any` at All Costs',
        content: `Using \`any\` completely turns off the TypeScript compiler for that expression. Instead:
- Use \`unknown\` when you do not yet know the shape (forces runtime validation before access).
- Use generics \`<T>\` to preserve caller type identity.`
      },
      {
        id: 'troubleshooting',
        title: '07 Common Compiler Errors Decoded',
        content: `- \`Property does not exist on type 'never'\`: You narrowed a union so far that no possible values remain.
- \`Type 'null' is not assignable to type 'string'\`: Enable \`strictNullChecks\` and handle \`null\` explicitly.`
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: 'What is the fundamental difference between `type` and `interface` in modern TypeScript?'
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'Use TypeScript inside our fullstack authentication lab.'
      }
    ],
    practicalSummary: 'Practice creating custom type guards and generic utility functions in our web projects.',
    labSlug: 'build-a-rest-api',
    labTitle: 'Build a REST API with Express & TypeScript',
    challenge: {
      question: 'What is the fundamental difference between `type` and `interface` in TypeScript?',
      hint: 'Think about declaration merging and primitive aliases.',
      answer: 'Interfaces can be merged (declaration merging) across multiple declarations and are strictly for object/class shapes. Types (type aliases) can name primitives, tuples, and complex union/intersection types, but cannot be reopened once defined.'
    },
    relatedTopics: [
      { title: 'React Architecture', slug: 'react', categorySlug: 'web-development', difficulty: 'Intermediate' },
      { title: 'RESTful API Design', slug: 'rest-api-design', categorySlug: 'web-development', difficulty: 'Beginner' }
    ],
    roadmap: {
      title: 'Web Development Roadmap',
      slug: 'web-development',
      stage: 'JavaScript & TypeScript'
    },
    instagramPost: {
      title: 'Stop using `any` in TypeScript',
      handle: '@learnwithpugazh',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Why `unknown` is 100x safer than `any` in modern TypeScript.'
    }
  },

  'linux-permissions': {
    id: 'topic-linux-permissions',
    title: 'Linux File Permissions & Security',
    slug: 'linux-permissions',
    category: 'Linux & Servers',
    categorySlug: 'linux-servers',
    groupName: 'Linux Fundamentals',
    description: 'Master chmod, chown, octal math, file access modes, umask, SUID, SGID, and sticky bits on production servers.',
    difficulty: 'Intermediate',
    estimatedTime: '12 min read',
    prerequisites: ['Basic Linux Terminal Navigation', 'Users and Groups'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Octal Notation' },
      { id: 'practical', label: '06 Practical Commands' },
      { id: 'troubleshooting', label: '07 Security Hardening' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: '01 Concept: The Unix Access Control Model',
        content: `In the Unix paradigm, "everything is a file"—from text documents and directories to block storage drives and network sockets.

Every inode in the Linux filesystem stores ownership metadata and an access permission bitmask divided into three distinct user tiers:
1. **User (u):** The specific owner of the file.
2. **Group (g):** The group members granted access.
3. **Others (o):** Every other process and account on the system.`
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters in Server Operations',
        content: `Improper file permissions are the single most common cause of privilege escalation vulnerabilities and compromised servers.
- Leaving web directories world-writable (\`chmod 777\`) allows any unprivileged www-data worker or compromised upload script to overwrite executable code.
- SSH keys (\`~/.ssh/id_rsa\`) will be actively rejected by the SSH client if permissions are looser than \`600\`.`
      },
      {
        id: 'how-it-works',
        title: '03 How It Works: The Permission Triad (rwx)',
        content: `Each tier has three basic access flags:
- **Read (r = 4):** Allows viewing file content, or listing directory entries (\`ls\`).
- **Write (w = 2):** Allows modifying file content, or creating/deleting files inside a directory.
- **Execute (x = 1):** Allows running a binary/script, or entering a directory (\`cd\`).`,
        table: {
          headers: ['Binary', 'Octal Value', 'Permission Symbol', 'Meaning'],
          rows: [
            ['000', '0', '---', 'No access permitted'],
            ['001', '1', '--x', 'Execute only (can enter directory)'],
            ['010', '2', '-w-', 'Write only'],
            ['011', '3', '-wx', 'Write and Execute'],
            ['100', '4', 'r--', 'Read only'],
            ['101', '5', 'r-x', 'Read and Execute (standard for public scripts/folders)'],
            ['110', '6', 'rw-', 'Read and Write (standard for files)'],
            ['111', '7', 'rwx', 'Read, Write, and Execute (full ownership)']
          ]
        }
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Breakdown of `ls -l` Output',
        content: `Inspecting a file with \`ls -l\`:`,
        codeBlock: {
          language: 'txt',
          caption: 'Decoding -rwxr-xr-- output',
          code: `-  rwx  r-x  r--   1  pugazh  engineers  4096  Sep 05 10:00  deploy.sh
│  ──┬── ──┬── ──┬──
│    │     │     └─ Others (Read only = 4)
│    │     └─────── Group (Read + Execute = 5)
│    └───────────── Owner (Read + Write + Execute = 7)
└────────────────── File Type (- = regular file, d = directory)`
        }
      },
      {
        id: 'example',
        title: '05 Octal Notation in Daily Practice',
        content: `Common production permission profiles:
- \`chmod 644 file.txt\` -> Owner read/write, everyone else read-only.
- \`chmod 755 script.sh\` -> Owner full control, others read/execute.
- \`chmod 600 ~/.ssh/id_rsa\` -> Owner read/write ONLY. No group or other access.`
      },
      {
        id: 'practical',
        title: '06 Practical Linux Administration Commands',
        content: `Essential permission commands:`,
        codeBlock: {
          language: 'bash',
          caption: 'Ownership and permission updates',
          code: `# Change owner and group simultaneously
sudo chown -R www-data:www-data /var/www/html

# Recursively fix directories to 755 and files to 644
find /var/www/html -type d -exec chmod 755 {} +
find /var/www/html -type f -exec chmod 644 {} +

# Add sticky bit to shared directory (/tmp behavior)
# Only file owner can delete their own files even if group has write access
chmod +t /shared/team_folder`
        }
      },
      {
        id: 'troubleshooting',
        title: '07 The Never `chmod 777` Rule',
        content: `Beginners frequently reach for \`chmod 777\` when experiencing "Permission Denied" errors. This is dangerous anti-pattern in production:
1. Always check who the running process user is (\`whoami\` or \`ps aux | grep nginx\`).
2. Add the user to the correct group instead: \`sudo usermod -aG www-data developer\`.
3. Check directory execute bit: remember that users cannot traverse or \`cd\` into a folder without the \`+x\` execute bit!`
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: 'Why does a directory need the Execute (x) permission bit just for a user to read a file inside it?'
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'Practice server administration in our dedicated Linux labs.'
      }
    ],
    practicalSummary: 'Log into an isolated Linux shell to configure users, manage sudoers, and set strict ACLs and umasks.',
    labSlug: 'user-permission-management',
    labTitle: 'Linux User & Permission Management Lab',
    challenge: {
      question: 'Why does a directory need the Execute (x) permission bit for a user to access a file inside it?',
      hint: 'Think about what "executing" a directory means in Unix.',
      answer: 'On a directory, the Execute (x) bit grants traversal rights (permission to pass through or `cd` into the directory and resolve inodes). Without `+x`, you cannot access or open any files inside it, even if the files themselves have `666` permissions.'
    },
    relatedTopics: [
      { title: 'SSH Hardening', slug: 'ssh', categorySlug: 'linux-servers', difficulty: 'Intermediate' },
      { title: 'User & Group Administration', slug: 'users-and-groups', categorySlug: 'linux-servers', difficulty: 'Beginner' }
    ],
    relatedLabs: [
      { title: 'User & Permission Management', slug: 'user-permission-management', difficulty: 'Beginner' },
      { title: 'SSH Server Hardening', slug: 'ssh-server', difficulty: 'Intermediate' }
    ],
    roadmap: {
      title: 'Linux & Servers Roadmap',
      slug: 'linux-servers',
      stage: 'Files & Permissions'
    },
    instagramPost: {
      title: 'Never Run chmod 777 in Production',
      handle: '@learnwithpugazh',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Why 777 ruins server security and what to do instead.'
    }
  },

  ssh: {
    id: 'topic-ssh',
    title: 'SSH Hardening & Public Key Cryptography',
    slug: 'ssh',
    category: 'Linux & Servers',
    categorySlug: 'linux-servers',
    groupName: 'Networking & SSH',
    description: 'Master asymmetric cryptography, ed25519 key generation, sshd_config hardening, and bastion jump hosts.',
    difficulty: 'Intermediate',
    estimatedTime: '13 min read',
    prerequisites: ['Linux Basics', 'Networking Port Concepts'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Key Generation' },
      { id: 'practical', label: '06 sshd_config Hardening' },
      { id: 'troubleshooting', label: '07 Troubleshooting' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: '01 Concept: Secure Remote Administration',
        content: `**Secure Shell (SSH)** is a cryptographic network protocol for operating network services securely over an unsecured network. It replaced vulnerable legacy cleartext protocols like Telnet and rlogin.

SSH provides:
- **Strong Encryption:** Symmetrical ciphers (AES-GCM, ChaCha20-Poly1305) encrypt all traffic in transit.
- **Server Authentication:** Protects clients against Man-in-the-Middle (MitM) attacks via host key fingerprints.
- **Integrity Verification:** Cryptographic MACs guarantee packets are not tampered with.`
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters in Modern DevOps',
        content: `Every Linux server exposed to the public internet on default port 22 receives thousands of automated brute-force attacks per minute. Relying on simple passwords results in swift server compromise.

Key-based authentication with modern **Ed25519** elliptic curves makes brute force mathematically impossible.`
      },
      {
        id: 'how-it-works',
        title: '03 How It Works: Public Key Authentication',
        content: `Public-key cryptography uses an asymmetric pair:
1. **Private Key (\`id_ed25519\`):** Kept strictly confidential on your client laptop. Protected by a local passphrase.
2. **Public Key (\`id_ed25519.pub\`):** Copied to the server and appended to \`~/.ssh/authorized_keys\`.

During authentication, the server generates a random cryptographic challenge, signs it with your public key, and verifies that only your private key could solve it—without your private key ever being transmitted over the wire.`
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Flow: The SSH Handshake',
        content: `1. TCP 3-Way Handshake on port 22.
2. Protocol & Cipher Negotiation.
3. Server Host Key Verification (stored in client \`~/.ssh/known_hosts\`).
4. Diffie-Hellman Key Exchange to derive symmetric session key.
5. User Authentication (public key challenge-response).`
      },
      {
        id: 'example',
        title: '05 Generating Modern Ed25519 Keys',
        content: `Never generate legacy RSA 1024 or 2048 keys. Always use modern Ed25519:`,
        codeBlock: {
          language: 'bash',
          caption: 'Generate and copy modern SSH keys',
          code: `# Generate key with descriptive comment
ssh-keygen -t ed25519 -C "pugazh@workstation"

# Copy to remote server with one command
ssh-copy-id -i ~/.ssh/id_ed25519.pub deployer@198.51.100.24`
        }
      },
      {
        id: 'practical',
        title: '06 Hardening /etc/ssh/sshd_config',
        content: `Production configuration recommendations:`,
        codeBlock: {
          language: 'bash',
          caption: 'Production sshd_config hardening',
          code: `# Edit server daemon config
sudo nano /etc/ssh/sshd_config

# Enforce key-only authentication
PasswordAuthentication no
PubkeyAuthentication yes

# Disable direct root login
PermitRootLogin prohibit-password

# Disallow empty passwords
PermitEmptyPasswords no

# Limit maximum authentication attempts per connection
MaxAuthTries 3

# Test configuration syntax before reloading
sudo sshd -t && sudo systemctl reload sshd`
        }
      },
      {
        id: 'troubleshooting',
        title: '07 Troubleshooting Connection Refusals',
        content: `- \`WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!\`: The server host key was regenerated (server rebuild) or someone is performing a MitM attack. Run \`ssh-keygen -R <host>\` after verifying the fingerprint out-of-band.
- \`Permission denied (publickey)\`: Check permissions on server: \`chmod 700 ~/.ssh\` and \`chmod 600 ~/.ssh/authorized_keys\`. SSH strictly ignores keys if the directory is world-writable.`
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: 'Why does SSH fail to authenticate if your user home directory (~/) has 777 permissions?'
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'Walk through real SSH server configuration in our hands-on lab.'
      }
    ],
    practicalSummary: 'Set up an OpenSSH server, disable root password access, and configure an SSH config client shortcut file with ProxyJump.',
    labSlug: 'ssh-server',
    labTitle: 'SSH Server Hardening & Bastion Setup',
    challenge: {
      question: 'Why does SSH refuse public key authentication if your remote home directory has 777 permissions?',
      hint: 'Consider what another unprivileged user could do to ~/.ssh if the parent folder is world-writable.',
      answer: 'StrictModes in sshd checks parent folder permissions. If ~ or ~/.ssh is world-writable, any unprivileged process could rename ~/.ssh and inject their own authorized_keys, compromising your identity. SSH blocks this proactively.'
    },
    relatedTopics: [
      { title: 'Files & Permissions', slug: 'linux-permissions', categorySlug: 'linux-servers', difficulty: 'Intermediate' },
      { title: 'Linux Network Diagnostics', slug: 'linux-network-tools', categorySlug: 'linux-servers', difficulty: 'Beginner' }
    ],
    relatedLabs: [
      { title: 'SSH Server Hardening', slug: 'ssh-server', difficulty: 'Intermediate' }
    ],
    roadmap: {
      title: 'Linux & Servers Roadmap',
      slug: 'linux-servers',
      stage: 'Networking & SSH'
    },
    instagramPost: {
      title: 'Why You Must Stop Using RSA 2048 for SSH',
      handle: '@learnwithpugazh',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Why ed25519 is smaller, faster, and significantly more secure.'
    }
  }
};

// Helper for topics that don't have custom long-form yet
export function getTopicBySlug(arg1: string, arg2?: string): Topic | undefined {
  const topicSlug = arg2 || arg1;
  const categorySlug = arg2 ? arg1 : (topics[topicSlug]?.categorySlug || 'networking');

  if (topics[topicSlug]) {
    return topics[topicSlug];
  }

  // Generate fallback structured topic matching the exact schema
  const formattedTitle = topicSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    id: `topic-${topicSlug}`,
    title: formattedTitle,
    slug: topicSlug,
    category: categorySlug === 'networking' ? 'Networking' : categorySlug === 'web-development' ? 'Web Development' : 'Linux & Servers',
    categorySlug,
    groupName: 'Core Curriculum',
    description: `Deep technical exploration of ${formattedTitle}, practical engineering implications, and structured production patterns.`,
    difficulty: 'Intermediate',
    estimatedTime: '10 min read',
    prerequisites: ['Foundational Concepts', 'Terminal Basics'],
    status: 'Available',
    tableOfContents: [
      { id: 'concept', label: '01 Concept' },
      { id: 'why-it-matters', label: '02 Why It Matters' },
      { id: 'how-it-works', label: '03 How It Works' },
      { id: 'visual-explanation', label: '04 Visual Explanation' },
      { id: 'example', label: '05 Practical Example' },
      { id: 'practical', label: '06 Hands-on Practice' },
      { id: 'troubleshooting', label: '07 Troubleshooting' },
      { id: 'challenge', label: '08 Knowledge Challenge' },
      { id: 'related', label: '09 Related Topics & Labs' },
    ],
    sections: [
      {
        id: 'concept',
        title: `01 Concept: Understanding ${formattedTitle}`,
        content: `${formattedTitle} represents an indispensable building block in modern systems design. In this guide, we demystify the core protocol rules, architectural boundaries, and operational tradeoffs without unnecessary academic jargon.`
      },
      {
        id: 'why-it-matters',
        title: '02 Why It Matters',
        content: `Mastering this concept empowers engineers to troubleshoot production anomalies faster, communicate clearly across technical teams, and design resilient, scalable infrastructure.`
      },
      {
        id: 'how-it-works',
        title: '03 How It Works',
        content: `We dissect the internal mechanics step-by-step, explaining how packets, states, or data frames transition through each phase of execution.`,
        callout: {
          type: 'info',
          title: 'Core Architecture',
          message: 'Pay special attention to the state transitions and boundary constraints when designing high-throughput environments.'
        }
      },
      {
        id: 'visual-explanation',
        title: '04 Visual Explanation',
        content: `Structured flow illustrating how requests or packets navigate through intermediate nodes and gateways.`
      },
      {
        id: 'example',
        title: '05 Real-World Example',
        content: `Practical implementation demonstrating how ${formattedTitle} is leveraged in enterprise deployments.`
      },
      {
        id: 'practical',
        title: '06 Practical Exercises & Commands',
        content: `Hands-on commands to inspect, monitor, and configure this subsystem in local test environments.`
      },
      {
        id: 'troubleshooting',
        title: '07 Troubleshooting Guide',
        content: `Common symptoms, failure points, and systematic remediation checklists.`
      },
      {
        id: 'challenge',
        title: '08 Knowledge Challenge',
        content: `Think critically about how this concept behaves under network partition or high concurrency conditions.`
      },
      {
        id: 'related',
        title: '09 Related Topics & Labs',
        content: 'Check out related roadmaps, labs, and projects to continue hands-on practice.'
      }
    ],
    practicalSummary: `Explore practical exercises and labs related to ${formattedTitle} in our interactive sandbox.`,
    relatedTopics: [
      { title: 'DNS (Domain Name System)', slug: 'dns', categorySlug: 'networking', difficulty: 'Intermediate' },
      { title: 'VLANs (Virtual LANs)', slug: 'vlan', categorySlug: 'networking', difficulty: 'Intermediate' }
    ]
  };
}
