import { Roadmap } from '../types';

export const roadmaps: Roadmap[] = [
  {
    id: 'roadmap-networking',
    title: 'Networking Roadmap',
    slug: 'networking',
    description: 'A structured step-by-step engineering progression from physical bit transmission to enterprise routing protocols and automated network operations.',
    estimatedDuration: '12–16 weeks',
    difficulty: 'Intermediate',
    iconName: 'Network',
    overview: 'This path guides you from electrical signals and OSI fundamentals to enterprise VLAN segmentation, dynamic OSPF routing, and production troubleshooting.',
    stages: [
      {
        id: 'stage-foundations',
        number: 1,
        title: 'Foundations',
        description: 'Understand the essential physical and logical communication models.',
        topics: [
          { title: 'What is Networking?', slug: 'what-is-networking', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'LAN vs WAN', slug: 'lan-vs-wan', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'OSI Model (7 Layers)', slug: 'osi-model', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'TCP/IP Model (4 Layers)', slug: 'tcp-ip-model', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'MAC Addresses & Hardware IDs', slug: 'mac-addresses', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'stage-addressing',
        number: 2,
        title: 'Addressing',
        description: 'Master binary IP partitioning, variable-length subnet masks, and private IP boundaries.',
        topics: [
          { title: 'IPv4 Addressing', slug: 'ipv4', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'Subnetting & CIDR', slug: 'subnetting', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' },
          { title: 'Private vs Public IP (RFC 1918)', slug: 'private-vs-public-ip', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'NAT & PAT Translation', slug: 'nat', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'stage-switching',
        number: 3,
        title: 'Switching',
        description: 'Layer 2 forwarding mechanics, broadcast domains, and VLAN segmentation.',
        topics: [
          { title: 'Ethernet Switching & CAM Tables', slug: 'ethernet-switching', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'VLANs (Virtual LANs)', slug: 'vlan', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' },
          { title: '802.1Q Trunking', slug: 'trunking', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' },
          { title: 'Spanning Tree Protocol (STP)', slug: 'stp', categorySlug: 'networking', status: 'In Progress', difficulty: 'Advanced' }
        ]
      },
      {
        id: 'stage-routing',
        number: 4,
        title: 'Routing',
        description: 'Packet forwarding decisions across distinct network boundaries and dynamic protocol convergence.',
        topics: [
          { title: 'Static Routing & Default Gateways', slug: 'static-routing-topic', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'Dynamic Routing Fundamentals', slug: 'dynamic-routing', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' },
          { title: 'OSPF Protocol (Link-State)', slug: 'ospf', categorySlug: 'networking', status: 'Available', difficulty: 'Advanced' },
          { title: 'RIP (Distance-Vector)', slug: 'rip', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'stage-services',
        number: 5,
        title: 'Network Services',
        description: 'The protocols that make applications work smoothly across internetworks.',
        topics: [
          { title: 'DHCP (Dynamic Host Configuration)', slug: 'dhcp', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'DNS (Domain Name System)', slug: 'dns', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' },
          { title: 'ARP & Address Resolution', slug: 'arp', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' },
          { title: 'HTTP / HTTPS & TLS', slug: 'http-https', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'stage-security',
        number: 6,
        title: 'Security',
        description: 'Controlling network access, boundary firewalling, and packet filtering.',
        topics: [
          { title: 'Access Control Lists (ACL)', slug: 'acl', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' },
          { title: 'Firewalls & Stateful Inspection', slug: 'firewalls', categorySlug: 'networking', status: 'In Progress', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'stage-troubleshooting',
        number: 7,
        title: 'Troubleshooting',
        description: 'Methodical root-cause discovery using packet captures and diagnostic utilities.',
        topics: [
          { title: 'Wireshark Packet Analysis', slug: 'wireshark', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' },
          { title: 'IP Conflicts & Duplicate MACs', slug: 'ip-conflicts', categorySlug: 'networking', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'stage-practical',
        number: 8,
        title: 'Practical Networking',
        description: 'Synthesizing everything in real-world packet tracer labs and physical hardware setups.',
        topics: [
          { title: 'Inter-VLAN Routing Lab', slug: 'inter-vlan-routing-topic', categorySlug: 'networking', status: 'Available', difficulty: 'Intermediate' }
        ]
      }
    ]
  },

  {
    id: 'roadmap-web-development',
    title: 'Web Development Roadmap',
    slug: 'web-development',
    description: 'A comprehensive frontend-to-backend path focusing on software craftsmanship, TypeScript, modern React, and robust API design.',
    estimatedDuration: '16–20 weeks',
    difficulty: 'Intermediate',
    iconName: 'Globe',
    overview: 'From fundamental browser layout and rendering engines to modern declarative UI state machines, type safety, and production deployments.',
    stages: [
      {
        id: 'web-stage-fundamentals',
        number: 1,
        title: 'Web Fundamentals',
        description: 'How the browser requests, parses, renders, and paints websites.',
        topics: [
          { title: 'How the Web Works', slug: 'how-the-web-works', categorySlug: 'web-development', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'web-stage-html',
        number: 2,
        title: 'HTML',
        description: 'Semantic markup, accessible tree structures, and metadata.',
        topics: [
          { title: 'HTML5 Semantic Architecture', slug: 'html5-semantics', categorySlug: 'web-development', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'web-stage-css',
        number: 3,
        title: 'CSS',
        description: 'Box model, layout algorithms (Flexbox, Grid), and responsive design.',
        topics: [
          { title: 'Modern CSS & Box Model', slug: 'css-box-model', categorySlug: 'web-development', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'web-stage-js',
        number: 4,
        title: 'JavaScript',
        description: 'Event loop, asynchronous promises, closures, and DOM manipulation.',
        topics: [
          { title: 'JavaScript Execution & Event Loop', slug: 'js-event-loop', categorySlug: 'web-development', status: 'Available', difficulty: 'Intermediate' },
          { title: 'Asynchronous JavaScript & Promises', slug: 'async-await', categorySlug: 'web-development', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'web-stage-ts',
        number: 5,
        title: 'TypeScript',
        description: 'Compile-time static typing, structural typing, and generic contracts.',
        topics: [
          { title: 'TypeScript Foundations', slug: 'typescript', categorySlug: 'web-development', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'web-stage-react',
        number: 6,
        title: 'React',
        description: 'Declarative component architecture, reconciliation, hooks, and state machines.',
        topics: [
          { title: 'React Architecture & Virtual DOM', slug: 'react', categorySlug: 'web-development', status: 'Available', difficulty: 'Intermediate' },
          { title: 'State Management & Custom Hooks', slug: 'react-state-management', categorySlug: 'web-development', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'web-stage-apis',
        number: 7,
        title: 'APIs',
        description: 'REST architectural principles, HTTP methods, and status codes.',
        topics: [
          { title: 'RESTful API Design', slug: 'rest-api-design', categorySlug: 'web-development', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'web-stage-auth',
        number: 8,
        title: 'Authentication',
        description: 'Stateless JWT tokens, HTTP-only cookies, and secure sessions.',
        topics: [
          { title: 'Authentication & JWT Tokens', slug: 'jwt-auth', categorySlug: 'web-development', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'web-stage-backend',
        number: 9,
        title: 'Backend',
        description: 'Node.js runtime, Express middleware architecture, and server pipelines.',
        topics: [
          { title: 'Express Middleware & Pipelines', slug: 'express-pipelines', categorySlug: 'web-development', status: 'In Progress', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'web-stage-databases',
        number: 10,
        title: 'Databases',
        description: 'Relational data modeling, SQL queries, indexing, and ACID constraints.',
        topics: [
          { title: 'Relational Database Schema Design', slug: 'sql-schema-design', categorySlug: 'web-development', status: 'Coming Soon', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'web-stage-deployment',
        number: 11,
        title: 'Deployment',
        description: 'Containerization, edge networks, reverse proxies, and production monitoring.',
        topics: [
          { title: 'Production Deployment & Edge CDNs', slug: 'deployment-edge', categorySlug: 'web-development', status: 'Coming Soon', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'web-stage-projects',
        number: 12,
        title: 'Projects',
        description: 'Synthesize skills into production-ready portfolio case studies.',
        topics: [
          { title: 'Fullstack Case Study Implementation', slug: 'fullstack-case-study', categorySlug: 'web-development', status: 'Available', difficulty: 'Intermediate' }
        ]
      }
    ]
  },

  {
    id: 'roadmap-linux',
    title: 'Linux & Servers Roadmap',
    slug: 'linux-servers',
    description: 'System administration, process inspection, secure shell hardening, daemon orchestration, and production server maintenance.',
    estimatedDuration: '10–14 weeks',
    difficulty: 'Intermediate',
    iconName: 'Terminal',
    overview: 'Gain deep comfort with the command line, Unix permission architecture, daemon lifecycles, and reliable server operations.',
    stages: [
      {
        id: 'linux-stage-fundamentals',
        number: 1,
        title: 'Linux Fundamentals',
        description: 'The Unix philosophy, standard streams (stdin/stdout/stderr), and directory hierarchies.',
        topics: [
          { title: 'Unix Philosophy & Shell Navigation', slug: 'unix-philosophy', categorySlug: 'linux-servers', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'linux-stage-permissions',
        number: 2,
        title: 'Files & Permissions',
        description: 'chmod, chown, octal math, sticky bits, umasks, and discretionary access control.',
        topics: [
          { title: 'Files & Permission Management', slug: 'linux-permissions', categorySlug: 'linux-servers', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'linux-stage-users',
        number: 3,
        title: 'Users & Groups',
        description: 'User accounts, group memberships, /etc/passwd, and sudoers privileges.',
        topics: [
          { title: 'User & Group Administration', slug: 'users-and-groups', categorySlug: 'linux-servers', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'linux-stage-processes',
        number: 4,
        title: 'Processes',
        description: 'Process lifecycles, PID allocation, signals (SIGTERM vs SIGKILL), and monitoring.',
        topics: [
          { title: 'Process Lifecycle & Signals', slug: 'linux-processes', categorySlug: 'linux-servers', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'linux-stage-services',
        number: 5,
        title: 'Services',
        description: 'systemd init system, writing unit files, restart policies, and journalctl.',
        topics: [
          { title: 'systemd Services & Daemons', slug: 'systemd-services', categorySlug: 'linux-servers', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'linux-stage-networking',
        number: 6,
        title: 'Networking',
        description: 'ip, ss, netstat, routing tables, and interface configuration on Linux.',
        topics: [
          { title: 'Linux Network Diagnostics', slug: 'linux-network-tools', categorySlug: 'linux-servers', status: 'Available', difficulty: 'Beginner' }
        ]
      },
      {
        id: 'linux-stage-ssh',
        number: 7,
        title: 'SSH',
        description: 'Asymmetric cryptography, Ed25519 keys, sshd_config hardening, and jump bastions.',
        topics: [
          { title: 'SSH Hardening & Key Authentication', slug: 'ssh', categorySlug: 'linux-servers', status: 'Available', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'linux-stage-logs',
        number: 8,
        title: 'Logs',
        description: 'System logging with rsyslog and journalctl query syntax.',
        topics: [
          { title: 'System Logging & Journald', slug: 'linux-logs', categorySlug: 'linux-servers', status: 'In Progress', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'linux-stage-storage',
        number: 9,
        title: 'Storage',
        description: 'Partitioning with fdisk, file systems (ext4, XFS), and mounting (/etc/fstab).',
        topics: [
          { title: 'Block Storage & Filesystem Mounting', slug: 'linux-storage', categorySlug: 'linux-servers', status: 'Coming Soon', difficulty: 'Intermediate' }
        ]
      },
      {
        id: 'linux-stage-raid',
        number: 10,
        title: 'RAID',
        description: 'Software RAID arrays with mdadm for disk redundancy and performance.',
        topics: [
          { title: 'Software RAID & Redundancy', slug: 'linux-raid', categorySlug: 'linux-servers', status: 'Coming Soon', difficulty: 'Advanced' }
        ]
      },
      {
        id: 'linux-stage-virt',
        number: 11,
        title: 'Virtualization',
        description: 'KVM hypervisors, cgroups, namespaces, and lightweight Linux containers.',
        topics: [
          { title: 'Linux Namespaces & Containerization', slug: 'linux-containers', categorySlug: 'linux-servers', status: 'Coming Soon', difficulty: 'Advanced' }
        ]
      },
      {
        id: 'linux-stage-admin',
        number: 12,
        title: 'Server Administration',
        description: 'Production patching, security updates, firewalling with UFW/iptables, and backups.',
        topics: [
          { title: 'Production Server Hardening', slug: 'server-hardening', categorySlug: 'linux-servers', status: 'Coming Soon', difficulty: 'Advanced' }
        ]
      }
    ]
  }
];

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return roadmaps.find(r => r.slug === slug);
}
