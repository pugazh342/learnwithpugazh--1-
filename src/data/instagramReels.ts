export interface InstagramReelItem {
  id: string;
  reelNumber: string;
  reelTitle: string;
  reelHook: string;
  reelCaption: string;
  instagramUrl: string;
  topicSlug?: string;
  labSlug?: string;
  projectSlug?: string;
  category: 'Networking' | 'Linux' | 'Web' | 'Security';
  duration: string;
  reach: string;
  likes: string;
  deepDiveTime: string;
  includes: string[];
  keyInsight: string;
  isPopular?: boolean;
}

export const instagramReels: InstagramReelItem[] = [
  {
    id: 'reel-dns-resolution',
    reelNumber: 'REEL #42',
    reelTitle: 'What happens when you type google.com?',
    reelHook: 'Ever wondered why typing an address triggers 4 different server queries in 12ms?',
    reelCaption: 'A 60-second visual journey from your browser cache to root nameservers, TLD registries, and authoritative zones.',
    instagramUrl: 'https://instagram.com/learnwithpugazh',
    topicSlug: 'dns',
    category: 'Networking',
    duration: '58s',
    reach: '62.4K',
    likes: '5.8K',
    deepDiveTime: '15 min read',
    includes: ['RFC 1035 Standards', 'Wireshark Packet Trace', 'dig & nslookup CLI guide', 'Interactive Diagram'],
    keyInsight: 'Your browser checks local socket resolver cache before ever pinging 8.8.8.8 or 1.1.1.1.',
    isPopular: true,
  },
  {
    id: 'reel-vlan-roas',
    reelNumber: 'REEL #39',
    reelTitle: 'Router-on-a-Stick in 60 seconds',
    reelHook: 'How one single physical router cable routes 100 enterprise departments simultaneously.',
    reelCaption: 'Multiplexing Layer 2 VLAN frames over an 802.1Q trunk link with virtual subinterfaces on Cisco IOS.',
    instagramUrl: 'https://instagram.com/learnwithpugazh',
    labSlug: 'inter-vlan-routing',
    category: 'Networking',
    duration: '60s',
    reach: '84.1K',
    likes: '8.1K',
    deepDiveTime: '35 min lab',
    includes: ['Packet Tracer .pkt Topology', 'Cisco IOS CLI Script', 'Subinterface Addressing Table', 'Troubleshooting Matrix'],
    keyInsight: '802.1Q inserts a 4-byte tag into standard Ethernet frames to maintain subnet segregation.',
    isPopular: true,
  },
  {
    id: 'reel-chmod-777',
    reelNumber: 'REEL #31',
    reelTitle: 'Why chmod 777 ruins your production server',
    reelHook: 'Stop running chmod -R 777 when your app has permission issues. Here is why.',
    reelCaption: 'Breaking down Linux octal permissions (rwxrwxrwx), SUID bit vulnerabilities, and how to use 755/644 properly.',
    instagramUrl: 'https://instagram.com/learnwithpugazh',
    topicSlug: 'linux-permissions',
    category: 'Linux',
    duration: '54s',
    reach: '49.8K',
    likes: '4.6K',
    deepDiveTime: '12 min read',
    includes: ['Octal Math Cheat Sheet', 'SUID/SGID Exploit Vectors', 'Production chown Recipes', 'Audit Script'],
    keyInsight: 'chmod 777 allows any unprivileged container process or compromised daemon to rewrite system binaries.',
    isPopular: true,
  },
  {
    id: 'reel-tcp-handshake',
    reelNumber: 'REEL #28',
    reelTitle: 'SYN, SYN-ACK, ACK Demystified',
    reelHook: 'Before sending a single byte of HTTP data, this 3-way dance happens every single time.',
    reelCaption: 'Understanding sequence numbers, acknowledgement flags, and window sizing in the TCP state machine.',
    instagramUrl: 'https://instagram.com/learnwithpugazh',
    topicSlug: 'tcp-three-way-handshake',
    category: 'Networking',
    duration: '59s',
    reach: '41.2K',
    likes: '3.9K',
    deepDiveTime: '18 min read',
    includes: ['Packet Sequence Timeline', 'SYN Flood Defense Strategy', 'Socket States (ESTABLISHED, TIME_WAIT)', 'CLI netstat/ss commands'],
    keyInsight: 'The sequence number initializes to a cryptographically pseudo-random integer to prevent packet spoofing.',
  },
  {
    id: 'reel-subnetting-mind',
    reelNumber: 'REEL #24',
    reelTitle: 'Subnetting in your head without a calculator',
    reelHook: 'Mastering CIDR /24 to /30 in 60 seconds using the magic number 256.',
    reelCaption: 'How to calculate network ID, first usable host, broadcast address, and host count without binary conversion.',
    instagramUrl: 'https://instagram.com/learnwithpugazh',
    topicSlug: 'subnetting',
    category: 'Networking',
    duration: '60s',
    reach: '95.6K',
    likes: '9.4K',
    deepDiveTime: '20 min read',
    includes: ['Magic Number 256 Table', 'VLSM Allocation Guide', 'Practice Quiz Engine', 'CIDR Reference Card'],
    keyInsight: 'Subtract the subnet mask octet from 256 to find your exact block multiplier instantly.',
    isPopular: true,
  },
  {
    id: 'reel-osi-vs-tcpip',
    reelNumber: 'REEL #19',
    reelTitle: 'OSI 7 Layers vs Real-World TCP/IP',
    reelHook: 'Why colleges teach 7 layers when the real internet only uses 4 or 5.',
    reelCaption: 'Comparing theoretical conceptual models with the pragmatic protocol suite that powers modern data centers.',
    instagramUrl: 'https://instagram.com/learnwithpugazh',
    topicSlug: 'osi-model',
    category: 'Networking',
    duration: '56s',
    reach: '53.0K',
    likes: '4.8K',
    deepDiveTime: '16 min read',
    includes: ['PDU Encapsulation Diagram', 'Protocol Mapping Matrix', 'Hardware Layer Reference (Switch vs Router)', 'Packet Headers'],
    keyInsight: 'OSI layers 5, 6, and 7 collapse cleanly into the application process layer in the TCP/IP stack.',
  }
];
