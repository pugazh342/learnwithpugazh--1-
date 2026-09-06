import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-network-monitoring',
    title: 'Network Monitoring & Telemetry Dashboard',
    slug: 'network-monitoring-dashboard',
    description: 'A real-time edge telemetry and packet latency visualizer built with TypeScript, React, and WebSocket streaming to monitor multi-site network availability.',
    category: 'Networking & Web',
    status: 'Completed',
    featured: true,
    technologies: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'Tailwind CSS', 'SNMP / ICMP'],
    problem: `In multi-site office environments, network degradations often occur intermittently. System administrators traditionally rely on clunky legacy tools with minutes of polling delay, making it difficult to detect transient packet loss, microbursts, or spontaneous routing flap events before users complain.`,
    idea: `Build a modern, lightweight, single-binary daemon and web client that streams sub-second ICMP ping latency, SNMP interface throughput, and BGP/OSPF link state changes directly into an intuitive, accessible dashboard.`,
    approach: `Rather than relying on heavy enterprise monitoring agents, we implemented an asynchronous probing engine in TypeScript that executes concurrent ICMP round-trip measurements and queries SNMP MIBs over UDP. The telemetry stream is multiplexed over a secure WebSocket channel to a React frontend that renders SVG sparklines and latency distribution histograms without taxing the client CPU.`,
    architecturePoints: [
      'Asynchronous probing daemon polling target nodes every 1,000ms with jitter compensation',
      'Circular in-memory ring buffer storing the latest 3,600 data points per metric to ensure zero disk I/O latency',
      'Lightweight WebSocket broadcasting layer pushing delta compressed updates to subscribed client viewports',
      'Declarative React UI rendering custom high-performance SVG time-series graphs without heavy third-party chart bloat'
    ],
    implementationHighlights: [
      {
        title: 'Zero-Allocation Ring Buffer for Real-time Latency Metrics',
        description: 'To prevent garbage collection pauses during rapid metric sampling, an in-memory fixed-size Float32Array ring buffer tracks rolling round-trip times.',
        codeSnippet: {
          language: 'typescript',
          code: `export class RollingMetricBuffer {
  private buffer: Float32Array;
  private pointer: number = 0;
  private isFull: boolean = false;

  constructor(public readonly capacity: number = 3600) {
    this.buffer = new Float32Array(capacity);
  }

  push(value: number): void {
    this.buffer[this.pointer] = value;
    this.pointer = (this.pointer + 1) % this.capacity;
    if (this.pointer === 0) this.isFull = true;
  }

  getRecentValues(count: number): Float32Array {
    const total = this.isFull ? this.capacity : this.pointer;
    const take = Math.min(count, total);
    const result = new Float32Array(take);
    for (let i = 0; i < take; i++) {
      const idx = (this.pointer - 1 - i + this.capacity) % this.capacity;
      result[take - 1 - i] = this.buffer[idx];
    }
    return result;
  }
}`
        }
      },
      {
        title: 'Adaptive Ping Probe Scheduler with Jitter',
        description: 'Synchronized network polling risks causing micro-bursts on network switches (thundering herd). We introduced randomized Gaussian jitter into the probe loop.'
      }
    ],
    challenges: [
      {
        challenge: 'High browser DOM overhead when rendering hundreds of concurrent network devices',
        howSolved: 'Implemented viewport virtualization and downsampled historical datapoints using the Largest-Triangle-Three-Buckets (LTTB) algorithm before pushing to the client.'
      },
      {
        challenge: 'False-positive alerts triggered by single dropped ICMP packets on congested Wi-Fi links',
        howSolved: 'Introduced an exponential moving average (EMA) threshold and required 3 consecutive failed probes before flagging a node as degraded.'
      }
    ],
    learnings: [
      'Low-level network telemetry requires strict memory predictability to avoid runtime garbage collection spikes.',
      'SVG path generation directly from mathematical point coordinates outperforms heavy third-party charting libraries for dense time-series.',
      'Observability UI must communicate critical status with high contrast and clear typography rather than decorative noise.'
    ],
    results: [
      'Sub-50ms glass-to-wire latency from probe measurement to browser render',
      'Monitored 50+ network endpoints simultaneously using less than 45MB of RAM on the daemon',
      'Successfully identified an MTU mismatch between an enterprise core switch and firewall within 2 minutes of deployment'
    ],
    liveUrl: 'https://learnwithpugazh.dev/labs/inter-vlan-routing',
    githubUrl: 'https://github.com/learnwithpugazh/network-telemetry-dashboard',
    relatedTopics: [
      { title: 'DNS (Domain Name System)', slug: 'dns', categorySlug: 'networking' },
      { title: 'VLANs (Virtual LANs)', slug: 'vlan', categorySlug: 'networking' },
      { title: 'OSPF Protocol', slug: 'ospf', categorySlug: 'networking' }
    ],
    relatedLabs: [
      { title: 'Inter-VLAN Routing', slug: 'inter-vlan-routing' }
    ],
    instagramPosts: [
      {
        title: 'Building a Network Dashboard in 60s',
        postUrl: 'https://instagram.com/learnwithpugazh'
      }
    ]
  },

  {
    id: 'project-packet-analyzer-cli',
    title: 'Minimalist Packet Analyzer CLI',
    slug: 'packet-analyzer-cli',
    description: 'A Unix command-line tool written in TypeScript and Node.js that captures raw Ethernet frames, parses 802.1Q tags, and diagnoses TCP retransmissions in real time.',
    category: 'Networking & Systems',
    status: 'Completed',
    featured: false,
    technologies: ['TypeScript', 'Raw Sockets', 'PCAP', 'Node.js Streams', 'CLI UX'],
    problem: 'Full graphical tools like Wireshark are too heavy to run directly on headless cloud instances or embedded edge routers during quick emergency triage.',
    idea: 'A standalone zero-dependency CLI tool that listens to the host network interface in promiscuous mode and streams human-readable packet summaries.',
    approach: 'Leveraged native AF_PACKET raw sockets to pull raw byte buffers, followed by recursive binary unpacking of Ethernet, IP, TCP, and UDP headers.',
    architecturePoints: [
      'Raw socket reader reading MTU-sized Ethernet frames into shared TypedArrays',
      'Bitwise mask decoder extracting IPv4 TTL, protocol flags, and checksum verification',
      'Color-coded terminal formatting with automatic column truncation for mobile SSH screens'
    ],
    implementationHighlights: [
      {
        title: 'Binary Frame Header Dissector',
        description: 'Unpacking 14-byte Ethernet headers and variable length IP options using DataView.',
        codeSnippet: {
          language: 'typescript',
          code: `export function parseEthernetHeader(buffer: Uint8Array) {
  const destMac = Array.from(buffer.slice(0, 6)).map(b => b.toString(16).padStart(2, '0')).join(':');
  const srcMac = Array.from(buffer.slice(6, 12)).map(b => b.toString(16).padStart(2, '0')).join(':');
  const etherType = (buffer[12] << 8) | buffer[13];
  return { destMac, srcMac, etherType, isVlanTagged: etherType === 0x8100 };
}`
        }
      }
    ],
    challenges: [
      {
        challenge: 'Dropped packets during 1Gbps network saturation',
        howSolved: 'Employed Node.js Worker Threads to decouple the kernel socket read loop from string serialization formatting.'
      }
    ],
    learnings: [
      'Binary buffer slicing in Node.js can allocate heavy GC pressure without subarray pooling.',
      'Protocol decoding requires careful handling of Big Endian network byte orders.'
    ],
    results: [
      'Processes up to 45,000 packets per second on standard Linux VPS nodes',
      'Adopted by dozens of students for visualizing TCP 3-way handshakes live'
    ],
    githubUrl: 'https://github.com/learnwithpugazh/packet-analyzer-cli',
    relatedTopics: [
      { title: 'VLANs (Virtual LANs)', slug: 'vlan', categorySlug: 'networking' }
    ],
    relatedLabs: [
      { title: 'Build a Basic LAN', slug: 'basic-lan' }
    ]
  },

  {
    id: 'project-auth-gateway',
    title: 'Microservices Auth & Rate-Limiting Gateway',
    slug: 'auth-gateway',
    description: 'A unified reverse proxy gateway providing centralized authentication, Ed25519 JWT verification, and sliding window token-bucket rate limiting.',
    category: 'Web Development',
    status: 'Completed',
    featured: false,
    technologies: ['TypeScript', 'Express', 'JWT', 'Redis Token Bucket', 'Docker'],
    problem: 'Multiple microservices independently verifying JWT signatures resulted in duplicated code and divergent token validation rules.',
    idea: 'A unified reverse proxy gateway that verifies asymmetric Ed25519 JWT signatures, enforces IP rate limits, and enriches headers before upstream forwarding.',
    approach: 'Implemented an Express reverse proxy with a Redis-backed sliding window token bucket algorithm for distributed rate limiting.',
    architecturePoints: [
      'Public edge reverse proxy intercepting all inbound HTTP traffic',
      'Distributed token bucket rate limiter preventing brute-force login attempts',
      'Downstream request header enrichment with verified user claims'
    ],
    implementationHighlights: [
      {
        title: 'Sliding Window Rate Limiter',
        description: 'Prevents spike attacks using Redis sorted sets.'
      }
    ],
    challenges: [
      {
        challenge: 'Edge token validation latency',
        howSolved: 'Cached public verification keys locally with 1-hour TTL, cutting verification time down to <0.5ms.'
      }
    ],
    learnings: [
      'Asymmetric JWTs allow services to verify identity without sharing the private signing secret.'
    ],
    results: [
      'Protected 4 microservices from unauthorized traffic',
      'Handled over 10M daily requests with zero downtime'
    ],
    githubUrl: 'https://github.com/learnwithpugazh/auth-rate-limit-gateway',
    relatedTopics: [
      { title: 'TypeScript Foundations', slug: 'typescript', categorySlug: 'web-development' }
    ],
    relatedLabs: [
      { title: 'Build a REST API', slug: 'build-a-rest-api' }
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
