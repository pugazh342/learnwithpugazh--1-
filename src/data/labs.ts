import { Lab } from '../types';

export const labs: Lab[] = [
  {
    id: 'lab-inter-vlan-routing',
    labNumber: 'LAB 03',
    title: 'Inter-VLAN Routing (Router-on-a-Stick)',
    slug: 'inter-vlan-routing',
    category: 'Networking',
    categorySlug: 'networking',
    difficulty: 'Intermediate',
    estimatedTime: '30–45 minutes',
    tools: ['Cisco Packet Tracer', 'GNS3', 'Physical Switch + Router'],
    prerequisites: [
      'Basic Ethernet switching and 802.1Q trunking concepts',
      'IP addressing and default gateway configuration',
      'Cisco IOS command line interface (CLI) navigation'
    ],
    objectives: [
      'Segment two distinct local departments (Sales & Engineering) into separate VLANs',
      'Configure an 802.1Q trunk link between a Cisco 2960 switch and a 1941 router',
      'Create subinterfaces on the router physical interface with 802.1Q encapsulation',
      'Verify end-to-end ICMP connectivity and default gateway forwarding across subnets',
      'Troubleshoot common encapsulation mismatches and trunk native VLAN misconfigurations'
    ],
    topologyDescription: 'Two client PCs (PC1 in VLAN 10 and PC2 in VLAN 20) connect to access ports Fa0/1 and Fa0/2 on Switch1. An 802.1Q trunk on Gi0/1 connects Switch1 to Router1 physical port Gi0/0. Subinterfaces Gi0/0.10 and Gi0/0.20 serve as the default gateways for each VLAN.',
    devices: [
      { id: 'dev-1', name: 'PC1 (Sales)', type: 'pc', ip: '192.168.10.10/24', vlan: '10', connections: ['Switch1 Fa0/1'] },
      { id: 'dev-2', name: 'PC2 (Engineering)', type: 'pc', ip: '192.168.20.10/24', vlan: '20', connections: ['Switch1 Fa0/2'] },
      { id: 'dev-3', name: 'Switch1 (2960)', type: 'switch', connections: ['PC1 Fa0/1', 'PC2 Fa0/2', 'Router1 Gi0/1'] },
      { id: 'dev-4', name: 'Router1 (1941)', type: 'router', ip: 'Gi0/0.10: 192.168.10.1, Gi0/0.20: 192.168.20.1', connections: ['Switch1 Gi0/1'] }
    ],
    conceptExplanation: `By default, VLANs partition a switch into separate Layer 2 broadcast domains. Devices in VLAN 10 cannot communicate with devices in VLAN 20 without a Layer 3 routing engine. 

Instead of connecting a dedicated physical router cable for every single VLAN (which quickly exhausts expensive router interfaces), the **Router-on-a-Stick (ROAS)** design multiplexes multiple logical subinterfaces over a single high-speed physical trunk link using IEEE 802.1Q tags. When PC1 sends a packet to PC2, the packet travels up the trunk link tagged with VLAN 10, the router strips the tag, routes into the VLAN 20 subinterface, and sends it back down the trunk tagged with VLAN 20.`,
    setupInstructions: [
      'Open Cisco Packet Tracer and create a new topology.',
      'Place one Cisco 1941 Router, one Cisco 2960 Switch, and two Generic PCs on the canvas.',
      'Connect PC1 to Switch Fa0/1 using a straight-through copper cable.',
      'Connect PC2 to Switch Fa0/2 using a straight-through copper cable.',
      'Connect Switch Gi0/1 to Router Gi0/0 using a straight-through copper cable.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Configure Client PC Addressing',
        explanation: 'Configure static IP addresses, subnet masks, and default gateways on both endpoints. The default gateway must match the subinterface IP we will configure on the router.',
        device: 'PC1 & PC2',
        command: `PC1 Settings:
IP Address: 192.168.10.10
Subnet Mask: 255.255.255.0
Default Gateway: 192.168.10.1

PC2 Settings:
IP Address: 192.168.20.10
Subnet Mask: 255.255.255.0
Default Gateway: 192.168.20.1`,
        tip: 'Double check that the Default Gateway IP is not identical to the PC IP address.'
      },
      {
        stepNumber: 2,
        title: 'Configure VLANs and Access Ports on Switch1',
        explanation: 'Create VLAN 10 and VLAN 20 in the switch database and assign the access ports.',
        device: 'Switch1',
        command: `Switch> enable
Switch# configure terminal
Switch(config)# hostname SW1
SW1(config)# vlan 10
SW1(config-vlan)# name SALES
SW1(config-vlan)# vlan 20
SW1(config-vlan)# name DEV
SW1(config-vlan)# exit

SW1(config)# interface FastEthernet 0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10
SW1(config-if)# exit

SW1(config)# interface FastEthernet 0/2
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 20
SW1(config-if)# exit`
      },
      {
        stepNumber: 3,
        title: 'Configure the 802.1Q Trunk Port to Router',
        explanation: 'The uplink port connected to the router must be placed into trunk mode to carry tags for both VLAN 10 and 20.',
        device: 'Switch1',
        command: `SW1(config)# interface GigabitEthernet 0/1
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20
SW1(config-if)# no shutdown
SW1(config-if)# exit`
      },
      {
        stepNumber: 4,
        title: 'Configure Router Subinterfaces (Router-on-a-Stick)',
        explanation: 'Activate the physical interface without an IP address, then define logical subinterfaces with 802.1Q encapsulation.',
        device: 'Router1',
        command: `Router> enable
Router# configure terminal
Router(config)# hostname R1

! Enable physical interface (do not assign IP to physical port)
R1(config)# interface GigabitEthernet 0/0
R1(config-if)# no ip address
R1(config-if)# no shutdown
R1(config-if)# exit

! Subinterface for VLAN 10
R1(config)# interface GigabitEthernet 0/0.10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0
R1(config-subif)# exit

! Subinterface for VLAN 20
R1(config)# interface GigabitEthernet 0/0.20
R1(config-subif)# encapsulation dot1Q 20
R1(config-subif)# ip address 192.168.20.1 255.255.255.0
R1(config-subif)# exit`
      }
    ],
    validation: [
      {
        testDescription: 'Verify Trunking state on Switch1',
        command: 'SW1# show interfaces trunk',
        expectedResult: 'Port Gi0/1 shows Mode: on, Status: trunking, Encapsulation: 802.1q, Allowed VLANs: 10,20',
        howYouKnowItWorked: 'If the trunk is down, check cable connection and verify `switchport mode trunk` was issued.'
      },
      {
        testDescription: 'Verify Router Subinterface Routing Table',
        command: 'R1# show ip route',
        expectedResult: 'Routes for 192.168.10.0/24 directly connected to Gi0/0.10 and 192.168.20.0/24 directly connected to Gi0/0.20',
        howYouKnowItWorked: 'Both routes appear with code "C" (Connected) in the routing table.'
      },
      {
        testDescription: 'End-to-End Inter-VLAN Ping Test',
        command: 'PC1 Command Prompt: ping 192.168.20.10',
        expectedResult: 'First packet may time out due to ARP resolution; subsequent 3 packets succeed with TTL 127/63.',
        howYouKnowItWorked: 'Receiving reply confirms packets crossed the switch, traversed the 802.1Q trunk, routed at L3, and returned.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Ping to default gateway 192.168.10.1 fails completely from PC1',
        probableCause: 'Switch port Fa0/1 is in the wrong VLAN or physical interface Gi0/0 on Router is shutdown.',
        systematicCheck: 'Run `show vlan brief` on SW1 to verify Fa0/1 is listed under VLAN 10. Run `show ip interface brief` on R1 to verify Gi0/0 is UP/UP.',
        resolution: 'Run `no shutdown` on router Gi0/0; reassign access port `switchport access vlan 10`.'
      },
      {
        symptom: 'PC1 can ping gateway 192.168.10.1, but cannot ping PC2 (192.168.20.10)',
        probableCause: 'PC2 firewall blocking ICMP, or PC2 default gateway misconfigured.',
        systematicCheck: 'Verify `ipconfig` on PC2. Check if PC2 can ping its own gateway `192.168.20.1`.',
        resolution: 'Correct PC2 default gateway to 192.168.20.1.'
      }
    ],
    challenge: {
      description: 'Add a 3rd department (Guest Wi-Fi) on VLAN 30 (192.168.30.0/24) using PC3 on Switch port Fa0/3.',
      requirement: 'Configure Switch1 and Router1 to route traffic between VLAN 30 and other departments.',
      collapsibleSolution: `SW1 Configuration:
SW1(config)# vlan 30
SW1(config-vlan)# name GUEST
SW1(config-vlan)# exit
SW1(config)# interface FastEthernet 0/3
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 30
SW1(config-if)# exit
SW1(config)# interface GigabitEthernet 0/1
SW1(config-if)# switchport trunk allowed vlan add 30

Router1 Configuration:
R1(config)# interface GigabitEthernet 0/0.30
R1(config-subif)# encapsulation dot1Q 30
R1(config-subif)# ip address 192.168.30.1 255.255.255.0`
    },
    whatYouLearned: [
      'How to logically isolate client subnets using IEEE 802.1Q tagged frames',
      'The purpose of subinterfaces on Layer 3 router ports',
      'How the router-on-a-stick topology routes frames between VLANs without physical hardware sprawl',
      'How to diagnose trunk negotiation and default gateway mismatches systematically'
    ],
    nextLab: {
      title: 'Static Routing & Default Gateways',
      slug: 'static-routing'
    },
    relatedTopics: [
      { title: 'VLANs (Virtual LANs)', slug: 'vlan', categorySlug: 'networking' },
      { title: 'Subnetting & CIDR', slug: 'subnetting', categorySlug: 'networking' },
      { title: 'Ethernet Switching', slug: 'ethernet-switching', categorySlug: 'networking' }
    ],
    relatedProjects: [
      { title: 'Network Monitoring Dashboard', slug: 'network-monitoring-dashboard' }
    ],
    instagramPost: {
      title: 'Router on a Stick Explained in 60s',
      postUrl: 'https://instagram.com/learnwithpugazh',
      caption: 'Why one physical cable can route 100 different departments.'
    }
  },

  {
    id: 'lab-configure-vlans',
    labNumber: 'LAB 02',
    title: 'Configure VLANs & Trunk Links',
    slug: 'configure-vlans',
    category: 'Networking',
    categorySlug: 'networking',
    difficulty: 'Beginner',
    estimatedTime: '25–35 minutes',
    tools: ['Cisco Packet Tracer', 'Switch CLI'],
    prerequisites: ['Basic Switch Operations', 'Ethernet Frame Structure'],
    objectives: [
      'Create and name VLANs across multiple switches',
      'Assign switchports to access mode and specific VLAN IDs',
      'Establish an 802.1Q trunk link between two switches',
      'Verify that broadcast domains are properly restricted'
    ],
    topologyDescription: 'Two switches (SW1 and SW2) connected by a Gigabit trunk link. Each switch connects 2 PCs in VLAN 10 and VLAN 20.',
    conceptExplanation: 'VLANs divide a single physical switch into multiple broadcast domains. Devices in different VLANs cannot communicate at Layer 2.',
    setupInstructions: ['Place 2 Cisco 2960 switches and 4 PCs in Packet Tracer.'],
    steps: [
      {
        stepNumber: 1,
        title: 'Create VLANs on SW1 and SW2',
        device: 'SW1 & SW2',
        explanation: 'Define VLAN 10 (Sales) and VLAN 20 (Engineering) on both switches.',
        command: `SW1(config)# vlan 10
SW1(config-vlan)# name SALES
SW1(config-vlan)# vlan 20
SW1(config-vlan)# name ENG`
      },
      {
        stepNumber: 2,
        title: 'Configure Trunk Between Switches',
        device: 'SW1 & SW2 Gi0/1',
        explanation: 'Configure GigabitEthernet 0/1 as an 802.1Q trunk on both switches.',
        command: `SW1(config)# interface Gi0/1
SW1(config-if)# switchport mode trunk`
      }
    ],
    validation: [
      {
        testDescription: 'Check active VLANs',
        command: 'show vlan brief',
        expectedResult: 'VLAN 10 and 20 are active with designated ports assigned.',
        howYouKnowItWorked: 'VLAN table lists ports under correct names.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Hosts in VLAN 10 on SW1 cannot ping hosts in VLAN 10 on SW2',
        probableCause: 'Trunk link not negotiating or VLAN 10 not allowed on trunk.',
        systematicCheck: 'Run `show interfaces trunk` on both switches.',
        resolution: 'Set `switchport mode trunk` and verify allowed VLANs list.'
      }
    ],
    challenge: {
      description: 'Change the native VLAN on the trunk to VLAN 99.',
      requirement: 'Ensure both switches match to prevent native VLAN mismatch syslog errors.',
      collapsibleSolution: `SW1(config-if)# switchport trunk native vlan 99
SW2(config-if)# switchport trunk native vlan 99`
    },
    whatYouLearned: ['VLAN creation', 'Access port assignments', '802.1Q trunking'],
    nextLab: {
      title: 'Inter-VLAN Routing (Router-on-a-Stick)',
      slug: 'inter-vlan-routing'
    },
    relatedTopics: [
      { title: 'VLANs (Virtual LANs)', slug: 'vlan', categorySlug: 'networking' }
    ]
  },

  {
    id: 'lab-basic-lan',
    labNumber: 'LAB 01',
    title: 'Build a Basic LAN & IP Addressing',
    slug: 'basic-lan',
    category: 'Networking',
    categorySlug: 'networking',
    difficulty: 'Beginner',
    estimatedTime: '20–30 minutes',
    tools: ['Cisco Packet Tracer', 'Command Prompt'],
    prerequisites: ['IPv4 Addressing Basics', 'Network Interface Cards'],
    objectives: [
      'Connect network endpoints through a central switch',
      'Configure static IPv4 addresses and subnet masks',
      'Verify Layer 2 broadcast discovery using ARP',
      'Test connectivity using ICMP ping'
    ],
    topologyDescription: '4 PCs connected to a central 2960 Ethernet switch in the 192.168.1.0/24 subnet.',
    conceptExplanation: 'A Local Area Network connects computers within a limited geographical area using Ethernet switches to forward frames based on MAC addresses.',
    setupInstructions: ['Place one 2960 switch and 4 PCs in Packet Tracer and cable with copper straight-through.'],
    steps: [
      {
        stepNumber: 1,
        title: 'Assign IP Addresses',
        device: 'PC0 - PC3',
        explanation: 'Configure IPs 192.168.1.10 through 192.168.1.13 with mask 255.255.255.0.',
        command: 'IP: 192.168.1.10, Mask: 255.255.255.0'
      }
    ],
    validation: [
      {
        testDescription: 'Ping test between endpoints',
        command: 'ping 192.168.1.11',
        expectedResult: '4/4 packets received with 0% loss.',
        howYouKnowItWorked: 'Replies received with valid round-trip times.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Destination host unreachable',
        probableCause: 'Mismatched subnet mask or bad cable link.',
        systematicCheck: 'Check link lights on switch; verify IP settings via ipconfig.',
        resolution: 'Fix IP subnet mask to 255.255.255.0.'
      }
    ],
    challenge: {
      description: 'Add a 5th PC and observe the ARP table update on the switch.',
      requirement: 'Run `show mac address-table` on the switch.',
      collapsibleSolution: 'Switch# show mac address-table displays dynamic MAC to port mappings.'
    },
    whatYouLearned: ['Ethernet cabling', 'IP addressing', 'ARP discovery', 'ICMP testing'],
    nextLab: {
      title: 'Configure VLANs & Trunk Links',
      slug: 'configure-vlans'
    },
    relatedTopics: [
      { title: 'What is Networking?', slug: 'what-is-networking', categorySlug: 'networking' }
    ]
  },

  {
    id: 'lab-static-routing',
    labNumber: 'LAB 04',
    title: 'Static Routing & Default Gateways',
    slug: 'static-routing',
    category: 'Networking',
    categorySlug: 'networking',
    difficulty: 'Intermediate',
    estimatedTime: '30–40 minutes',
    tools: ['Cisco Packet Tracer', 'Router CLI'],
    prerequisites: ['IP Subnetting', 'Basic Router Commands'],
    objectives: [
      'Connect two distinct branch routers over a serial/gigabit link',
      'Configure static routes with next-hop IP addresses',
      'Implement default static routes (0.0.0.0/0) for internet gateways',
      'Verify route tables and path tracing'
    ],
    topologyDescription: 'HQ Router and Branch Router interconnected via 10.0.0.0/30 point-to-point link, with separate client LANs.',
    conceptExplanation: 'Static routing manually defines exact path entries in a router table without protocol communication overhead.',
    setupInstructions: ['Place 2 routers and 2 switches with PCs.'],
    steps: [
      {
        stepNumber: 1,
        title: 'Configure Static Routes',
        device: 'HQ Router',
        explanation: 'Direct branch traffic via next-hop IP.',
        command: 'HQ(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2'
      }
    ],
    validation: [
      {
        testDescription: 'Inspect routing table',
        command: 'show ip route',
        expectedResult: 'Static route listed with code S.',
        howYouKnowItWorked: 'Traffic to destination network forwarded to next hop.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Packets leave HQ but never return from Branch',
        probableCause: 'Missing reverse static route on Branch router.',
        systematicCheck: 'Verify both routers have paths to each other’s LANs.',
        resolution: 'Add `ip route 192.168.1.0 255.255.255.0 10.0.0.1` on Branch.'
      }
    ],
    challenge: {
      description: 'Configure a floating static route with administrative distance 10 as backup.',
      requirement: 'Provide backup next hop.',
      collapsibleSolution: 'HQ(config)# ip route 192.168.2.0 255.255.255.0 10.0.1.2 10'
    },
    whatYouLearned: ['Static routing', 'Default routes', 'Next-hop resolution'],
    nextLab: {
      title: 'OSPF Configuration & Neighbor Adjacency',
      slug: 'ospf-configuration'
    },
    relatedTopics: [
      { title: 'Static Routing', slug: 'static-routing-topic', categorySlug: 'networking' }
    ]
  },

  {
    id: 'lab-ospf-configuration',
    labNumber: 'LAB 05',
    title: 'OSPF Multi-Router Configuration',
    slug: 'ospf-configuration',
    category: 'Networking',
    categorySlug: 'networking',
    difficulty: 'Advanced',
    estimatedTime: '45–60 minutes',
    tools: ['Cisco Packet Tracer', 'GNS3'],
    prerequisites: ['Subnetting & VLSM', 'Routing Fundamentals', 'OSPF Concept Guide'],
    objectives: [
      'Configure single-area OSPF across 3 routers in Area 0',
      'Set explicit 32-bit Router IDs for deterministic election',
      'Verify neighbor adjacencies reach FULL state',
      'Simulate link failure and witness sub-second convergence'
    ],
    topologyDescription: '3 Cisco 1941 routers interconnected in a triangle topology for redundant path calculation.',
    conceptExplanation: 'OSPF is a link-state routing protocol that calculates the shortest path using Dijkstra algorithm.',
    setupInstructions: ['Place 3 routers and configure IP addressing on interconnecting links.'],
    steps: [
      {
        stepNumber: 1,
        title: 'Activate OSPF Routing Process',
        device: 'Router 1',
        explanation: 'Configure router-id and advertise networks into Area 0.',
        command: `R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0`
      }
    ],
    validation: [
      {
        testDescription: 'Inspect OSPF Neighbor Table',
        command: 'show ip ospf neighbor',
        expectedResult: 'Neighbor state listed as FULL/DR or FULL/BDR.',
        howYouKnowItWorked: 'State indicates link-state databases are 100% synchronized.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Neighbor stuck in INIT state',
        probableCause: 'Hellos received but router ID not acknowledged, or firewall blocking multicast 224.0.0.5.',
        systematicCheck: 'Verify matching subnet mask and hello interval timers.',
        resolution: 'Ensure hello/dead timers and area IDs match identically.'
      }
    ],
    challenge: {
      description: 'Tune interface cost to force traffic along preferred 1Gbps link.',
      requirement: 'Apply `ip ospf cost 5` on interface.',
      collapsibleSolution: 'R1(config-if)# ip ospf cost 5'
    },
    whatYouLearned: ['OSPF process configuration', 'Wildcard masks', 'Dijkstra convergence'],
    relatedTopics: [
      { title: 'OSPF Protocol', slug: 'ospf', categorySlug: 'networking' }
    ]
  },

  {
    id: 'lab-ssh-server',
    labNumber: 'LAB 11',
    title: 'SSH Server Hardening & Bastion Jump Host',
    slug: 'ssh-server',
    category: 'Linux & Servers',
    categorySlug: 'linux-servers',
    difficulty: 'Intermediate',
    estimatedTime: '30–40 minutes',
    tools: ['Linux Terminal', 'OpenSSH', 'SSH Client'],
    prerequisites: ['Linux User Management', 'File Permissions (chmod/chown)'],
    objectives: [
      'Generate Ed25519 asymmetric cryptographic key pairs',
      'Deploy public keys to remote authorized_keys with strict permissions',
      'Harden /etc/ssh/sshd_config to eliminate password and root login vectors',
      'Configure client ~/.ssh/config for jump-host proxying'
    ],
    topologyDescription: 'Client laptop connecting securely through an external Linux bastion jump host to an internal database server.',
    conceptExplanation: 'Securing the administrative control plane of Linux servers using public key cryptography.',
    setupInstructions: ['Launch a Linux instance or container with OpenSSH installed.'],
    steps: [
      {
        stepNumber: 1,
        title: 'Generate Ed25519 Keypair',
        device: 'Client Machine',
        explanation: 'Create high-security elliptic-curve SSH keypair.',
        command: 'ssh-keygen -t ed25519 -C "admin@learnwithpugazh"'
      }
    ],
    validation: [
      {
        testDescription: 'Verify Passwordless Login',
        command: 'ssh -i ~/.ssh/id_ed25519 deployer@server-ip',
        expectedResult: 'Instant cryptographic login without password prompt.',
        howYouKnowItWorked: 'Session opens directly into bash prompt.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'Permission denied (publickey)',
        probableCause: 'Permissions too open on ~/.ssh or ~/.ssh/authorized_keys.',
        systematicCheck: 'Check `ls -la ~/.ssh`.',
        resolution: 'Run `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`.'
      }
    ],
    challenge: {
      description: 'Configure an SSH client alias with ProxyJump in ~/.ssh/config.',
      requirement: 'Create clean shortcut.',
      collapsibleSolution: `Host db-internal
  HostName 10.0.2.14
  User dbadmin
  ProxyJump bastion.company.com`
    },
    whatYouLearned: ['Public key authentication', 'sshd_config hardening', 'SSH config shortcuts'],
    relatedTopics: [
      { title: 'SSH Hardening', slug: 'ssh', categorySlug: 'linux-servers' },
      { title: 'Files & Permissions', slug: 'linux-permissions', categorySlug: 'linux-servers' }
    ]
  },

  {
    id: 'lab-user-permission-management',
    labNumber: 'LAB 09',
    title: 'Linux User & Permission Management',
    slug: 'user-permission-management',
    category: 'Linux & Servers',
    categorySlug: 'linux-servers',
    difficulty: 'Beginner',
    estimatedTime: '25–35 minutes',
    tools: ['Linux Bash Shell'],
    prerequisites: ['Terminal Command Line Navigation'],
    objectives: [
      'Create users and groups using useradd and groupadd',
      'Manage sudo privileges via /etc/sudoers.d/',
      'Apply octal and symbolic permissions using chmod',
      'Configure sticky bits on shared collaboration directories'
    ],
    topologyDescription: 'A standalone multi-tenant Linux server environment.',
    conceptExplanation: 'Unix discretionary access control models permissions as user, group, and other bitmasks.',
    setupInstructions: ['Open a Linux terminal session with root/sudo access.'],
    steps: [
      {
        stepNumber: 1,
        title: 'Create Service Account and Group',
        device: 'Linux Host',
        explanation: 'Create devops group and deployer user.',
        command: `sudo groupadd devops
sudo useradd -m -s /bin/bash -g devops deployer`
      }
    ],
    validation: [
      {
        testDescription: 'Test group membership',
        command: 'id deployer',
        expectedResult: 'uid=1001(deployer) gid=1001(devops) groups=1001(devops)',
        howYouKnowItWorked: 'Output confirms user identity and primary group.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'User cannot cd into directory despite 666 permissions',
        probableCause: 'Directories require execute (x) bit for traversal.',
        systematicCheck: 'Run `ls -ld <folder>`.',
        resolution: 'Run `chmod 755 <folder>` to add execute bit.'
      }
    ],
    challenge: {
      description: 'Set up a sticky bit on /opt/shared so team members can create files but only authors can delete them.',
      requirement: 'Apply `chmod +t`.',
      collapsibleSolution: 'sudo chmod 1777 /opt/shared'
    },
    whatYouLearned: ['chmod octal values', 'chown ownership', 'sticky bit semantics'],
    relatedTopics: [
      { title: 'Files & Permissions', slug: 'linux-permissions', categorySlug: 'linux-servers' }
    ]
  },

  {
    id: 'lab-build-a-rest-api',
    labNumber: 'LAB 13',
    title: 'Build a Production REST API with Express & TypeScript',
    slug: 'build-a-rest-api',
    category: 'Web Development',
    categorySlug: 'web-development',
    difficulty: 'Intermediate',
    estimatedTime: '40–50 minutes',
    tools: ['Node.js', 'Express', 'TypeScript', 'Postman / curl'],
    prerequisites: ['TypeScript Basics', 'HTTP Protocol & Status Codes'],
    objectives: [
      'Initialize a structured TypeScript backend server with Express',
      'Implement RESTful CRUD endpoints adhering to HTTP standards',
      'Build request validation middleware with schema parsing',
      'Handle global uncaught errors and return standardized JSON error objects'
    ],
    topologyDescription: 'RESTful API server receiving client JSON requests over HTTP port 3000.',
    conceptExplanation: 'REST (Representational State Transfer) is an architectural style utilizing standard HTTP methods (GET, POST, PUT, DELETE) to manage stateless resources.',
    setupInstructions: ['Create a new Node.js project directory and initialize package.json.'],
    steps: [
      {
        stepNumber: 1,
        title: 'Define Express Router and Endpoints',
        device: 'Backend Server',
        explanation: 'Create type-safe routes for resource management.',
        command: `app.get('/api/v1/resources', (req, res) => res.json({ status: 'ok', data: [] }));`
      }
    ],
    validation: [
      {
        testDescription: 'Inspect API response with curl',
        command: 'curl -i http://localhost:3000/api/v1/resources',
        expectedResult: 'HTTP/1.1 200 OK with application/json header.',
        howYouKnowItWorked: 'Endpoint returns valid response with 200 status.'
      }
    ],
    troubleshooting: [
      {
        symptom: 'req.body is undefined in POST route',
        probableCause: 'Missing JSON body parsing middleware.',
        systematicCheck: 'Check if `app.use(express.json())` is mounted.',
        resolution: 'Add `app.use(express.json())` before router definitions.'
      }
    ],
    challenge: {
      description: 'Implement a rate-limiting middleware that limits clients to 60 requests per minute.',
      requirement: 'Track request timestamps by IP.',
      collapsibleSolution: 'Use an in-memory sliding window or redis bucket to reject requests exceeding quota with HTTP 429 Too Many Requests.'
    },
    whatYouLearned: ['REST API design', 'Express middleware pipeline', 'TypeScript validation'],
    relatedTopics: [
      { title: 'TypeScript Foundations', slug: 'typescript', categorySlug: 'web-development' },
      { title: 'React Architecture', slug: 'react', categorySlug: 'web-development' }
    ]
  }
];

export function getLabBySlug(slug: string): Lab | undefined {
  return labs.find(l => l.slug === slug);
}

export function getLabsByCategory(category: string): Lab[] {
  const norm = category.toLowerCase().trim();
  return labs.filter(
    l => l.category.toLowerCase().includes(norm) ||
         l.categorySlug.toLowerCase().includes(norm) ||
         norm.includes(l.categorySlug.toLowerCase())
  );
}
