import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'networking',
    slug: 'networking',
    name: 'Networking',
    description: 'Master packet flow, switching, routing protocols, subnets, and modern network architecture from first principles.',
    iconName: 'Network',
    topicCount: 29,
    featuredTopicSlug: 'dns',
    groups: [
      {
        name: 'Foundations',
        description: 'Core concepts underlying computer communications and protocol hierarchies.',
        topics: [
          { title: 'What is Networking?', slug: 'what-is-networking', status: 'Available', difficulty: 'Beginner', readTime: '6 min', summary: 'The fundamental paradigm of interconnected devices and packet exchange.' },
          { title: 'LAN vs WAN', slug: 'lan-vs-wan', status: 'Available', difficulty: 'Beginner', readTime: '5 min', summary: 'Local and wide area boundary differences, topologies, and link constraints.' },
          { title: 'OSI Model', slug: 'osi-model', status: 'Available', difficulty: 'Beginner', readTime: '12 min', summary: 'The 7-layer abstraction model and encapsulation from application to wire.' },
          { title: 'TCP/IP Model', slug: 'tcp-ip-model', status: 'Available', difficulty: 'Beginner', readTime: '10 min', summary: 'The 4-layer practical internet architecture that powers the modern web.' },
          { title: 'MAC Addresses', slug: 'mac-addresses', status: 'Available', difficulty: 'Beginner', readTime: '7 min', summary: 'Layer 2 hardware identifiers, OUIs, and Ethernet frame addressing.' },
          { title: 'IP Addresses', slug: 'ip-addresses', status: 'Available', difficulty: 'Beginner', readTime: '8 min', summary: 'Logical layer 3 addressing, hierarchical routing, and host identification.' }
        ]
      },
      {
        name: 'Addressing & Subnetting',
        description: 'Binary arithmetic, address space partitioning, and network address translation.',
        topics: [
          { title: 'IPv4 Addressing', slug: 'ipv4', status: 'Available', difficulty: 'Beginner', readTime: '9 min', summary: '32-bit addresses, classes, private ranges (RFC 1918), and limitations.' },
          { title: 'Subnetting & CIDR', slug: 'subnetting', status: 'Available', difficulty: 'Intermediate', readTime: '15 min', summary: 'Variable Length Subnet Masking (VLSM), prefix lengths, and broadcast calculations.' },
          { title: 'IPv6 Foundations', slug: 'ipv6', status: 'In Progress', difficulty: 'Intermediate', readTime: '11 min', summary: '128-bit hexadecimal addressing, neighbor discovery, and global unicast.' },
          { title: 'Private vs Public IP', slug: 'private-vs-public-ip', status: 'Available', difficulty: 'Beginner', readTime: '6 min', summary: 'Routing across internet boundaries and reserved RFC 1918 blocks.' },
          { title: 'NAT & PAT', slug: 'nat', status: 'Available', difficulty: 'Intermediate', readTime: '10 min', summary: 'Network Address Translation and Port Address Translation mechanics.' }
        ]
      },
      {
        name: 'Network Services',
        description: 'Core infrastructure protocols that make applications work smoothly across networks.',
        topics: [
          { title: 'DNS (Domain Name System)', slug: 'dns', status: 'Available', difficulty: 'Intermediate', readTime: '14 min', summary: 'Hierarchical name resolution, recursive vs authoritative, and record types.' },
          { title: 'DHCP Protocol', slug: 'dhcp', status: 'Available', difficulty: 'Beginner', readTime: '8 min', summary: 'DORA process, lease allocation, DHCP relay agents, and options.' },
          { title: 'ARP & MAC Learning', slug: 'arp', status: 'Available', difficulty: 'Beginner', readTime: '7 min', summary: 'Resolving IPv4 addresses to Layer 2 physical hardware MACs.' },
          { title: 'ICMP & Diagnostics', slug: 'icmp', status: 'Available', difficulty: 'Beginner', readTime: '6 min', summary: 'Ping, traceroute mechanics, and control message delivery.' },
          { title: 'HTTP / HTTPS & TLS', slug: 'http-https', status: 'Available', difficulty: 'Intermediate', readTime: '12 min', summary: 'Stateless request-response, TCP 3-way handshakes, and TLS 1.3 encryption.' }
        ]
      },
      {
        name: 'Switching & VLANs',
        description: 'Layer 2 forwarding, broadcast domain segmentation, and loop prevention.',
        topics: [
          { title: 'Ethernet Switching', slug: 'ethernet-switching', status: 'Available', difficulty: 'Beginner', readTime: '8 min', summary: 'CAM table population, frame forwarding, unicast vs flooding.' },
          { title: 'VLANs (Virtual LANs)', slug: 'vlan', status: 'Available', difficulty: 'Intermediate', readTime: '12 min', summary: '802.1Q encapsulation, access ports, trunk links, and native VLANs.' },
          { title: 'Trunking Protocols', slug: 'trunking', status: 'Available', difficulty: 'Intermediate', readTime: '9 min', summary: 'Tagging frames across switch-to-switch links with 802.1Q.' },
          { title: 'Inter-VLAN Routing', slug: 'inter-vlan-routing-topic', status: 'Available', difficulty: 'Intermediate', readTime: '11 min', summary: 'Router-on-a-stick subinterfaces and Layer 3 Switch SVIs.' },
          { title: 'Spanning Tree Protocol (STP)', slug: 'stp', status: 'In Progress', difficulty: 'Advanced', readTime: '15 min', summary: '802.1D / RSTP root bridge election, port roles, and loop-free topology.' }
        ]
      },
      {
        name: 'Routing Protocols',
        description: 'Directing packets across autonomous systems and intermediate hops.',
        topics: [
          { title: 'Static Routing', slug: 'static-routing-topic', status: 'Available', difficulty: 'Beginner', readTime: '8 min', summary: 'Administrative distance, default gateways, and manual route injection.' },
          { title: 'Dynamic Routing Fundamentals', slug: 'dynamic-routing', status: 'Available', difficulty: 'Intermediate', readTime: '9 min', summary: 'Distance-vector vs link-state algorithms, convergence, and metrics.' },
          { title: 'OSPF Protocol', slug: 'ospf', status: 'Available', difficulty: 'Advanced', readTime: '16 min', summary: 'Link-state advertisements, Dijkstra SPF algorithm, areas, and adjacency states.' },
          { title: 'RIP (Routing Information Protocol)', slug: 'rip', status: 'Available', difficulty: 'Beginner', readTime: '7 min', summary: 'Hop count metric, split horizon, and poison reverse mechanics.' },
          { title: 'EIGRP Overview', slug: 'eigrp', status: 'Coming Soon', difficulty: 'Advanced', readTime: '13 min', summary: 'Cisco hybrid protocol, DUAL algorithm, composite metric calculation.' }
        ]
      },
      {
        name: 'Network Security',
        description: 'Access control lists, boundary firewalls, and microsegmentation.',
        topics: [
          { title: 'Access Control Lists (ACL)', slug: 'acl', status: 'Available', difficulty: 'Intermediate', readTime: '10 min', summary: 'Standard and extended ACLs, wildcard masks, and packet filtering.' },
          { title: 'Firewalls & Stateful Inspection', slug: 'firewalls', status: 'In Progress', difficulty: 'Intermediate', readTime: '11 min', summary: 'Packet filtering vs stateful inspection, DMZs, and security zones.' },
          { title: 'Network Segmentation', slug: 'network-segmentation', status: 'Coming Soon', difficulty: 'Intermediate', readTime: '8 min', summary: 'Isolating attack vectors with microsegmentation and zero-trust policies.' }
        ]
      },
      {
        name: 'Troubleshooting & Tools',
        description: 'Systematic diagnostics, packet capture analysis, and isolation methodology.',
        topics: [
          { title: 'Wireshark Packet Analysis', slug: 'wireshark', status: 'Available', difficulty: 'Intermediate', readTime: '14 min', summary: 'Capture filters, display filters, stream following, and TCP anomalies.' },
          { title: 'IP Conflicts & ARP Issues', slug: 'ip-conflicts', status: 'Available', difficulty: 'Beginner', readTime: '7 min', summary: 'Detecting duplicate IPs with gratuitous ARP and systematic resolution.' },
          { title: 'DNS Resolution Diagnostics', slug: 'dns-troubleshooting', status: 'Available', difficulty: 'Intermediate', readTime: '8 min', summary: 'Debugging resolution failures with dig, nslookup, and traceroute.' }
        ]
      }
    ]
  },
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'Web Development',
    description: 'Craft robust, accessible, and high-performance modern web applications from HTML fundamentals to scalable React and TypeScript.',
    iconName: 'Globe',
    topicCount: 22,
    featuredTopicSlug: 'react',
    groups: [
      {
        name: 'Web Fundamentals',
        description: 'How browsers fetch, parse, and render digital experiences.',
        topics: [
          { title: 'How the Web Works', slug: 'how-the-web-works', status: 'Available', difficulty: 'Beginner', readTime: '7 min', summary: 'Client-server model, DNS lookups, TCP handshake, and HTTP requests.' },
          { title: 'HTML5 Semantic Architecture', slug: 'html5-semantics', status: 'Available', difficulty: 'Beginner', readTime: '8 min', summary: 'Accessible document structuring, landmark tags, and screen readers.' },
          { title: 'Modern CSS & Box Model', slug: 'css-box-model', status: 'Available', difficulty: 'Beginner', readTime: '9 min', summary: 'Margin collapse, padding, flexbox, grid, and fluid responsive layouts.' }
        ]
      },
      {
        name: 'JavaScript & TypeScript',
        description: 'Core programming language mechanics, asynchronous event loop, and type systems.',
        topics: [
          { title: 'JavaScript Execution & Event Loop', slug: 'js-event-loop', status: 'Available', difficulty: 'Intermediate', readTime: '13 min', summary: 'Call stack, microtask queue, macrotask queue, and non-blocking I/O.' },
          { title: 'TypeScript Foundations', slug: 'typescript', status: 'Available', difficulty: 'Intermediate', readTime: '15 min', summary: 'Type inference, union narrowing, interfaces, generics, and strictness.' },
          { title: 'Asynchronous JavaScript & Promises', slug: 'async-await', status: 'Available', difficulty: 'Intermediate', readTime: '10 min', summary: 'Promises, async/await, error boundaries, and unhandled rejections.' }
        ]
      },
      {
        name: 'Modern React',
        description: 'Declarative component architecture, state machines, and rendering optimizations.',
        topics: [
          { title: 'React Architecture & Virtual DOM', slug: 'react', status: 'Available', difficulty: 'Intermediate', readTime: '14 min', summary: 'Reconciliation algorithm, fiber tree, hooks mechanics, and pure renders.' },
          { title: 'State Management & Custom Hooks', slug: 'react-state-management', status: 'Available', difficulty: 'Intermediate', readTime: '11 min', summary: 'Lifting state, reducer patterns, contexts, and composable custom hooks.' },
          { title: 'Performance & Component Memoization', slug: 'react-performance', status: 'In Progress', difficulty: 'Advanced', readTime: '12 min', summary: 'useMemo, useCallback, React Compiler, and avoiding costly re-renders.' }
        ]
      },
      {
        name: 'APIs, Backend & Database',
        description: 'Contract-driven REST endpoints, authentication flows, and relational schemas.',
        topics: [
          { title: 'RESTful API Design', slug: 'rest-api-design', status: 'Available', difficulty: 'Beginner', readTime: '9 min', summary: 'HTTP verbs, status codes, idempotent operations, and pagination.' },
          { title: 'Authentication & JWT Tokens', slug: 'jwt-auth', status: 'Available', difficulty: 'Intermediate', readTime: '12 min', summary: 'Stateless authentication, HTTP-only cookies, token rotation, and claims.' },
          { title: 'Relational Database Schema Design', slug: 'sql-schema-design', status: 'Coming Soon', difficulty: 'Intermediate', readTime: '14 min', summary: 'Normalization, foreign keys, indexes, and ACID transactions.' }
        ]
      }
    ]
  },
  {
    id: 'linux-servers',
    slug: 'linux-servers',
    name: 'Linux & Servers',
    description: 'Command line fluency, file systems, user permissions, daemon management, and production server hardening.',
    iconName: 'Terminal',
    topicCount: 18,
    featuredTopicSlug: 'linux-permissions',
    groups: [
      {
        name: 'Linux Fundamentals',
        description: 'The Unix philosophy, file hierarchy standard, and shell navigation.',
        topics: [
          { title: 'Unix Philosophy & Shell Navigation', slug: 'unix-philosophy', status: 'Available', difficulty: 'Beginner', readTime: '7 min', summary: 'Standard streams (stdin, stdout, stderr), pipes, and directory structures.' },
          { title: 'Files & Permission Management', slug: 'linux-permissions', status: 'Available', difficulty: 'Intermediate', readTime: '12 min', summary: 'chmod, chown, octal notation, sticky bits, umask, and SUID/SGID flags.' },
          { title: 'User & Group Administration', slug: 'users-and-groups', status: 'Available', difficulty: 'Beginner', readTime: '8 min', summary: '/etc/passwd, /etc/shadow, sudoers privileges, and useradd.' }
        ]
      },
      {
        name: 'Processes & Services',
        description: 'Init systems, process lifecycles, and systemd unit configurations.',
        topics: [
          { title: 'Process Lifecycle & Signals', slug: 'linux-processes', status: 'Available', difficulty: 'Intermediate', readTime: '10 min', summary: 'PID, fork/exec, kill signals (SIGTERM vs SIGKILL), ps, and top.' },
          { title: 'systemd Services & Daemons', slug: 'systemd-services', status: 'Available', difficulty: 'Intermediate', readTime: '11 min', summary: 'Writing custom unit files, systemctl commands, restart policies, and journalctl.' }
        ]
      },
      {
        name: 'Networking & SSH',
        description: 'Remote server access, firewalls, and network diagnostic utilities.',
        topics: [
          { title: 'SSH Hardening & Key Authentication', slug: 'ssh', status: 'Available', difficulty: 'Intermediate', readTime: '13 min', summary: 'Public key pairs, ssh-agent, disabling root password login, and sshd_config.' },
          { title: 'Linux Network Diagnostics', slug: 'linux-network-tools', status: 'Available', difficulty: 'Beginner', readTime: '9 min', summary: 'ip, ss, netstat, curl, tcpdump, and resolving connection bottlenecks.' }
        ]
      }
    ]
  }
];

export const upcomingCategories = [
  { name: 'Cloud Computing', status: 'In Architecture', topics: 'AWS, GCP, Terraform, VPCs', iconName: 'Cloud' },
  { name: 'DevOps & CI/CD', status: 'Planned', topics: 'Docker, GitHub Actions, Kubernetes', iconName: 'GitBranch' },
  { name: 'Cybersecurity', status: 'Planned', topics: 'Penetration Testing, Cryptography, SOC', iconName: 'Shield' }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
