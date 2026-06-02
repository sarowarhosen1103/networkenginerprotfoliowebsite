const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read URI from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/MONGODB_URI=["']?([^"'\s]+)["']?/);
if (!match) {
  console.error("Could not find MONGODB_URI in .env.local");
  process.exit(1);
}
const MONGODB_URI = match[1];

// Define Inline Schemas to avoid ES Module import issues with Next.js models
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    command: { type: String, default: "" },
    codeSnippet: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    videoUrl: { type: String, required: true },
    command: { type: String, default: "" },
    codeSnippet: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["project", "video"], required: true },
  },
  { timestamps: true }
);
CategorySchema.index({ name: 1, type: 1 }, { unique: true });

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

const projectCategories = ["Cyber Security", "Network Automation", "Cloud Architecture", "Enterprise Routing", "Wireless Design"];
const videoCategories = ["Tutorial", "Security Briefing", "Architecture Design", "Live Troubleshooting", "Automation Lab"];

const projectsData = [
  {
    title: "BGP Automated Route Optimizer",
    description: "An automated traffic-engineering controller that monitors autonomous system path quality metrics and updates local BGP routing policies via Netconf.",
    category: "Network Automation",
    tags: ["BGP", "Netconf", "Python", "Telemetry"],
    command: "python bgp_optimize.py --as 65001 --threshold 150",
    codeSnippet: "def optimize_bgp_route(peer_ip, local_pref):\n    netconf_xml = f'''<config><bgp><peer><ip>{peer_ip}</ip><local-preference>{local_pref}</local-preference></peer></bgp></config>'''\n    with manager.connect(host='r1.net') as m:\n        m.edit_config(target='running', config=netconf_xml)",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=BGP+OPTIMIZER",
    content: "### System Overview\n\nThis system implements a dynamic, automated BGP traffic engineering solution. By collecting real-time telemetry from edge transit interfaces and monitoring metrics like packet loss, Jitter, and latency, it identifies sub-optimal route states.\n\n### Core Functional Units\n\n- **Telemetry Listener**: Collects streaming telemetry from WAN interfaces.\n- **Optimizing Daemon**: Analyzes paths against defined performance SLAs.\n- **XML Policy Injector**: Generates Netconf configurations and pushes changes to edge nodes.\n\n### Deployment steps:\n\n1. Launch the dockerized orchestrator listener:\n   `docker compose up -d telemetry-listener`\n2. Run this route tuning optimization suite with proper thresholds:\n   `python bgp_optimize.py --as 65001 --threshold 150`"
  },
  {
    title: "Zero Trust Access Gateway",
    description: "A secure micro-segmented reverse proxy verifying user authentication, client certificates, and posture compliance before allocating dynamic firewall rules.",
    category: "Cyber Security",
    tags: ["ZTNA", "FortiOS", "OAuth2", "PKI"],
    command: "docker run -d -p 443:443 --name zt-gateway border-agent:latest",
    codeSnippet: "async function authorizeRequest(clientCert, token) {\n  const user = await verifyToken(token);\n  const certValid = await verifyPKI(clientCert);\n  if (user && certValid) {\n    return await enableDynamicACL(user.ip, 'APP_NET');\n  }\n  throw new Error('ACCESS_DENIED');\n}",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=ZERO+TRUST",
    content: "### Security Topology & Zero Trust Access\n\nThis application functions as a micro-segmented Reverse Proxy acting as an **Identity-Aware Proxy (IAP)**. It eliminates standard perimeter-based VPN access by validating the following security components for every ingress packet:\n\n- **User Authentication**: Integrates OAuth2 / OIDC authentication.\n- **Client PKI Certificate Validation**: Enforces Mutual TLS (mTLS) checks.\n- **Endpoint posture compliance**: Checks if antivirus, firewall, and OS versions meet baseline policies before mapping ingress routing tables.\n\n### Access Flow Diagram:\n\n1. Client requests access via Port `443`.\n2. Gateway intercepts request and triggers mTLS verification.\n3. User logs in with OIDC credentials.\n4. Device profiling checks are processed.\n5. Custom dynamic firewall ACL is constructed to enable point-to-point network channels."
  },
  {
    title: "AWS VPC Blueprint Infrastructure",
    description: "A production-grade, highly available Terraform architecture featuring private subnets, NAT gateways, transit routers, and dual-homed VPN tunnels.",
    category: "Cloud Architecture",
    tags: ["Terraform", "AWS", "IaC", "VPC"],
    command: "terraform apply -var='region=us-east-1' -auto-approve",
    codeSnippet: "resource \"aws_vpc\" \"prod\" {\n  cidr_block = \"10.0.0.0/16\"\n  enable_dns_hostnames = true\n  tags = {\n    Name = \"PROD_NET_CORE\"\n  }\n}",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=AWS+BLUEPRINT"
  },
  {
    title: "SD-WAN Orchestrator Sync",
    description: "Automated controller script to sync firewall policy modifications and routing updates from a central management console to multiple remote sites.",
    category: "Enterprise Routing",
    tags: ["SD-WAN", "API", "FortiManager", "Sync"],
    command: "node sdwan-sync.js --fmg-ip 192.168.10.5 --push-all",
    codeSnippet: "async function pushPolicyPackage(siteId, packageId) {\n  const res = await fetch(`https://fmg.internal/jsonrpc`, {\n    method: 'POST',\n    body: JSON.stringify({ method: 'exec/install/package', params: { site: siteId, pkg: packageId } })\n  });\n  return res.ok;\n}",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=SD-WAN+SYNC"
  },
  {
    title: "WPA3 Enterprise Auth Policy",
    description: "Robust wireless security baseline configuring radius auth servers, dynamic VLAN assignment, and fast BSS transition protocols (802.11r).",
    category: "Wireless Design",
    tags: ["802.1X", "RADIUS", "802.11r", "WPA3"],
    command: "wlan-config --profile corp-wpa3 --radius 10.10.1.5 --auth enterprise",
    codeSnippet: "wlan service-template CORP_NET\n ssid CORP_SECURE\n security-ie wpa3\n cipher-suite aes\n client-auth 802.1x\n radius-scheme RadiusServer1",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=WPA3+AUTH"
  },
  {
    title: "FortiGate Policy Auto-Generator",
    description: "Parses Excel-based security spreadsheets and converts them into standard FortiOS API calls to add hundreds of verified security policies.",
    category: "Cyber Security",
    tags: ["FortiGate", "REST", "Python", "Security"],
    command: "python generate_policies.py --file firewall_rules.xlsx --commit",
    codeSnippet: "def create_fortigate_policy(src_intf, dst_intf, src_addr, dst_addr, service, action):\n    payload = {\n        \"name\": f\"AUTO_{src_addr}_TO_{dst_addr}\",\n        \"srcintf\": [{\"name\": src_intf}],\n        \"dstintf\": [{\"name\": dst_intf}],\n        \"srcaddr\": [{\"name\": src_addr}],\n        \"dstaddr\": [{\"name\": dst_addr}],\n        \"service\": [{\"name\": service}],\n        \"action\": action,\n        \"status\": \"enable\"\n    }\n    requests.post(\"https://fg.internal/api/v2/cmdb/firewall/policy\", json=payload, verify=False)",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=FORTIGATE+AUTO"
  },
  {
    title: "OSPF Multi-Area Tuning Suite",
    description: "Configures prefix suppression, stub and NSSA routing areas, OSPF cryptography authentication, and interface costs to achieve highly predictable paths.",
    category: "Enterprise Routing",
    tags: ["OSPF", "Routing", "Cisco", "Multi-Area"],
    command: "ios-config --load ospf_tuning.cfg --device core-r1",
    codeSnippet: "router ospf 100\n area 1 stub no-summary\n area 0 authentication message-digest\n interface GigabitEthernet0/1\n  ip ospf message-digest-key 1 md5 CYBER_SECURE\n  ip ospf cost 10",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=OSPF+TUNING"
  },
  {
    title: "Kubernetes Calico CNI Engine",
    description: "Implements strict network security policy rules inside a Kubernetes cluster using Calico BGP networking peer connections to top-of-rack switches.",
    category: "Cloud Architecture",
    tags: ["Kubernetes", "Calico", "BGP", "CNI"],
    command: "kubectl apply -f calico-bgp-peering.yaml",
    codeSnippet: "apiVersion: projectcalico.org/v3\nkind: BGPPeer\nmetadata:\n  name: bgp-to-rack-switch\nspec:\n  peerIP: 192.168.100.1\n  asNumber: 65100",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=CALICO+CNI"
  },
  {
    title: "Ansible Cisco IOS Switch Seeder",
    description: "Ansible playbooks designed to dynamically configure base settings (SSH, hostname, NTP, SNMP, local users) on fresh out-of-the-box layer-2 switches.",
    category: "Network Automation",
    tags: ["Ansible", "IOS", "SSH", "Seeder"],
    command: "ansible-playbook -i hosts provision_switches.yml --ask-vault-pass",
    codeSnippet: "- name: Configure Base System settings\n  cisco.ios.ios_system:\n    hostname: \"{{ switch_name }}\"\n    domain_name: network.internal\n    name_servers:\n      - 8.8.8.8\n      - 1.1.1.1",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=SWITCH+SEEDER"
  },
  {
    title: "IPS/IDS Flow Analyzer",
    description: "A streaming packet collector capturing network interface spans and pumping telemetry into Snort IDS to trigger automatic ACL blocks on security controllers.",
    category: "Cyber Security",
    tags: ["IPS", "IDS", "Snort", "ACL"],
    command: "snort -c /etc/snort/snort.conf -i eth1 -D",
    codeSnippet: "alert tcp any any -> 192.168.1.0/24 80 (msg:\"SQL_INJECTION_DETECTED\"; content:\"UNION SELECT\"; nocase; sid:1000001;)",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=IDS+ANALYZER"
  },
  {
    title: "Site-to-Site WireGuard Daemon",
    description: "A highly resilient WireGuard VPN orchestration script that continuously monitors endpoint latency and swaps routes dynamically if high-loss is seen.",
    category: "Cyber Security",
    tags: ["WireGuard", "VPN", "Bash", "Routing"],
    command: "systemctl start wg-tunnel-guardian.service",
    codeSnippet: "while true; do\n  ping -c 3 -I wg0 10.200.1.1 > /dev/null\n  if [ $? -ne 0 ]; then\n    ip route replace 10.50.0.0/16 dev eth0 via 192.168.10.1\n  fi\n  sleep 10\ndone",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=WIREGUARD+TUNNEL"
  },
  {
    title: "PRTG Active Alerts Dispatcher",
    description: "Hooks into PRTG Network Monitor REST notifications, translates network failures into formatted Slack cards and opens priority Jira tickets.",
    category: "Network Automation",
    tags: ["PRTG", "REST", "Jira", "Slack"],
    command: "npm run start-alert-dispatcher",
    codeSnippet: "app.post('/prtg-alert', async (req, res) => {\n  const { sensor, device, status, message } = req.body;\n  if (status === 'Down') {\n    await sendSlackAlert(device, sensor, message);\n    await createJiraTicket(device, message);\n  }\n  res.sendStatus(200);\n});",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=PRTG+ALERTS"
  },
  {
    title: "VLAN Multi-Tenant Allocator",
    description: "Automated network portal where tenants can allocate distinct secure subnets, dynamically updating upstream trunk ports and router sub-interfaces.",
    category: "Enterprise Routing",
    tags: ["VLAN", "Portal", "Subnetting", "Automation"],
    command: "python allocate_vlan.py --tenant \"AcmeCorp\" --size 64",
    codeSnippet: "def allocate_tenant_net(name, mask_size):\n    subnet = find_free_subnet(mask_size)\n    vlan_id = db.get_next_vlan()\n    cisco_sw.create_vlan(vlan_id, name)\n    cisco_router.add_sub_interface(vlan_id, subnet)\n    return {\"subnet\": subnet, \"vlan\": vlan_id}",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=VLAN+ALLOCATOR"
  },
  {
    title: "Azure Transit Gateway Architect",
    description: "Deploys a robust Azure Hub-and-Spoke enterprise topology using Virtual WAN, routing tables, network virtual appliances, and private link connections.",
    category: "Cloud Architecture",
    tags: ["Azure", "Hub-Spoke", "vWAN", "Cloud"],
    command: "az deployment group create --resource-group vnet-rg --template-file main.bicep",
    codeSnippet: "resource hubVnet 'Microsoft.Network/virtualNetworks@2022-07-01' = {\n  name: 'HUB_VNET'\n  location: location\n  properties: {\n    addressSpace: { addressPrefixes: ['10.100.0.0/16'] }\n  }\n}",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=AZURE+TRANSIT"
  },
  {
    title: "802.1X Dynamic Radius Profiler",
    description: "Configures FreeRADIUS with dynamic authorization (CoA) to inspect connecting endpoint MAC addresses and dynamically assign correct network segments.",
    category: "Wireless Design",
    tags: ["RADIUS", "FreeRADIUS", "CoA", "MAB"],
    command: "radiusd -X -d /etc/freeradius",
    codeSnippet: "DEFAULT Auth-Type := Accept\n\tTunnel-Type = VLAN,\n\tTunnel-Medium-Type = 802,\n\tTunnel-Private-Group-Id = \"%{sql:SELECT vlan_id FROM devices WHERE mac='%{User-Name}'}\"",
    imageUrl: "https://placehold.co/600x400/131314/00f2ff?text=RADIUS+PROFILER"
  }
];

const videosData = [
  {
    title: "BGP Path Selection Logic Tutorial",
    description: "Deep dive into BGP path selection attributes: Weight, Local Preference, AS-Path, Origin, MED, eBGP vs iBGP and IGP metrics.",
    category: "Tutorial",
    tags: ["BGP", "Routing", "Core"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "show ip bgp 8.8.8.8",
    codeSnippet: "router bgp 65001\n bgp bestpath med missing-as-worst\n neighbor 192.168.1.1 route-map SELECT_PATH in\nroute-map SELECT_PATH permit 10\n set local-preference 200",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=BGP+LOGIC",
    content: "### BGP Path Selection Logic Deep-Dive\n\nThis video presents a comprehensive walkthrough of the internal decision-making processes governing BGP routing. \n\nWe cover the 13 path selection criteria ordered sequentially:\n\n1. **Weight**: Highest weight (Cisco specific) is preferred.\n2. **Local Preference**: Highest local preference preferred.\n3. **Locally Originated**: Prefer paths injected locally.\n4. **AS-Path Length**: Shortest AS-Path preferred.\n5. **Origin Type**: Prefer IGP over EGP over Incomplete.\n6. **MED (Multi-Exit Discriminator)**: Lowest MED preferred.\n7. **Neighbor Type**: Prefer eBGP over iBGP path advertisements.\n\n### Lab Practice Steps:\n\n- Connect to the test routers.\n- Verify current paths via `show ip bgp` console queries.\n- Modify local preferences and observe deterministic route switches."
  },
  {
    title: "Building FortiGate Active-Active Cluster",
    description: "Step-by-step architecture video demonstrating how to set up active-active FortiGate clusters using FGCP protocol for state synchronization.",
    category: "Architecture Design",
    tags: ["FortiGate", "HA", "Cluster", "Security"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "diagnose sys ha status",
    codeSnippet: "config system ha\n    set group-id 1\n    set group-name FG_HA_CLUSTER\n    set mode a-a\n    set hbdev \"port3\" 50 \"port4\" 50\n    set session-pickup enable\nend",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=FORTIGATE+HA"
  },
  {
    title: "Decoupling VLANs with VRF-Lite",
    description: "Learn how to segregate internal corporate networks without deploying multiple physical firewalls by leveraging Cisco VRF-Lite features.",
    category: "Tutorial",
    tags: ["VRF-Lite", "VLAN", "Cisco"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "show ip route vrf CORPORATE",
    codeSnippet: "ip vrf CORPORATE\n rd 65001:100\nip vrf GUEST\n rd 65001:200\ninterface GigabitEthernet0/1.100\n ip vrf forwarding CORPORATE\n ip address 10.1.1.1 255.255.255.0",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=VRF-LITE"
  },
  {
    title: "Securing Cisco ASA with AnyConnect SSL VPN",
    description: "Full configuration guide explaining local user profiles, client address pools, and cryptographic policies to enable remote secure connections.",
    category: "Security Briefing",
    tags: ["VPN", "AnyConnect", "SSL", "Cisco-ASA"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "show vpn-sessiondb anyconnect",
    codeSnippet: "webvpn\n enable outside\n anyconnect image disk0:/anyconnect-win.pkg 1\n anyconnect enable\n group-policy GP_USERS internal\n group-policy GP_USERS attributes\n  vpn-tunnel-protocol ssl-client",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=ANYCONNECT+VPN"
  },
  {
    title: "Debugging OSPF Neighbor State Flaps",
    description: "Live console logging session troubleshooting MTU mismatches, hello-interval discrepancies, and security key mismatch blockages in OSPF.",
    category: "Live Troubleshooting",
    tags: ["OSPF", "Cisco", "Console"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "debug ip ospf adj",
    codeSnippet: "R1# debug ip ospf adj\nOSPF adjacency events debugging is on\nR1#\n*May 17 09:12:35: OSPF-1 ADJ Gi0/1: Nbr 192.168.1.2 has larger MTU (1500 vs 1480)\n*May 17 09:12:35: OSPF-1 ADJ Gi0/1: Nbr 192.168.1.2 goes back to EXSTART state",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=OSPF+DEBUG"
  },
  {
    title: "Ansible Playbook Walkthrough: IOS Upgrades",
    description: "Automate network operating system upgrades securely. Verifies system storage space, MD5 checksum, and reboots IOS devices safely.",
    category: "Automation Lab",
    tags: ["Ansible", "IOS", "Upgrade", "Automation"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "ansible-playbook switch_upgrade.yml -k",
    codeSnippet: "- name: Verify current IOS version\n  cisco.ios.ios_facts:\n    gather_subset: min\n  register: ios_facts\n\n- name: Upgrade firmware if out of date\n  cisco.ios.ios_command:\n    commands: \"copy tftp://10.1.1.10/c3560.bin flash:\"\n  when: ios_facts.ansible_facts.ansible_net_version != '15.2(2)E6'",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=ANSIBLE+UPGRADE"
  },
  {
    title: "Analyzing PCAPs with Wireshark like a Pro",
    description: "Shows professional analysts filters to rapidly isolate TCP handshakes, DNS response delays, and SSL certificate exchanges inside capture files.",
    category: "Tutorial",
    tags: ["Wireshark", "Packet-Analysis", "PCAP"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "tshark -r capture.pcap -Y \"tcp.analysis.retransmission\"",
    codeSnippet: "// Wireshark Display Filter to find delayed HTTP GET requests:\nhttp.request.method == \"GET\" && http.time > 0.5\n// Filter to isolate DNS failure responses:\ndns.flags.response == 1 && dns.flags.rcode != 0",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=WIRESHARK+PCAP"
  },
  {
    title: "Configuring F5 LTM Virtual Servers",
    description: "Covers local traffic management setups including load balancing pools, HTTP profiles, source-persistence maps, and SSL offloading configs.",
    category: "Architecture Design",
    tags: ["F5-LTM", "Load-Balancer", "SSL"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "tmsh show ltm virtual vip_https",
    codeSnippet: "create ltm pool pool_web_servers members add { 10.1.1.11:80 10.1.1.12:80 } monitor http\ncreate ltm virtual vip_web_http {\n  destination 192.168.50.10:80\n  ip-protocol tcp\n  pool pool_web_servers\n  profiles add { http tcp }\n}",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=F5+LTM+LOAD"
  },
  {
    title: "Threat Hunting with Suricata and ELK Stack",
    description: "Configures Suricata IPS rules to parse active system logs and export structured EVE JSON output files directly into Elasticsearch index pipelines.",
    category: "Security Briefing",
    tags: ["Suricata", "ELK", "Security", "Hunting"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "suricata -c /etc/suricata/suricata.yaml -i eno1",
    codeSnippet: "# suricata.yaml EVE log output configuration:\noutputs:\n  - eve-log:\n      enabled: yes\n      filetype: regular\n      filename: eve.json\n      types:\n        - alert\n        - http\n        - dns",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=SURICATA+IDS"
  },
  {
    title: "AWS Transit Gateway Multi-Region Routing",
    description: "Advanced AWS Cloud Architecture tutorial routing massive multi-region corporate network segments securely via central transit tunnels.",
    category: "Architecture Design",
    tags: ["AWS", "Transit-Gateway", "Cloud", "Routing"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "aws ec2 describe-transit-gateways",
    codeSnippet: "resource \"aws_ec2_transit_gateway_route\" \"peer_route\" {\n  destination_cidr_block         = \"172.16.0.0/12\"\n  transit_gateway_attachment_id  = aws_ec2_transit_gateway_peering_attachment.peer.id\n  transit_gateway_route_table_id = aws_ec2_transit_gateway.local.association_default_route_table_id\n}",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=AWS+TRANSIT"
  },
  {
    title: "Python Netmiko Switch Config Backups",
    description: "Write a production python automation daemon designed to login to dynamic Cisco inventory IPs, download running configurations and commit to git.",
    category: "Automation Lab",
    tags: ["Python", "Netmiko", "Automation", "Cisco"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "python switch_backup.py --inventory switches.json",
    codeSnippet: "from netmiko import ConnectHandler\ndef backup_running_config(ip, username, password):\n    device = {\n        'device_type': 'cisco_ios',\n        'host': ip,\n        'username': username,\n        'password': password\n    }\n    with ConnectHandler(**device) as net_connect:\n        output = net_connect.send_command('show running-config')\n    return output",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=PYTHON+BACKUP"
  },
  {
    title: "Fixing Spanning Tree Loop Broadcast Storms",
    description: "Live emergency network rescue session locating a physical ethernet loop causing extreme high packet losses and CPU spikes on aggregate core nodes.",
    category: "Live Troubleshooting",
    tags: ["STP", "Cisco", "Broadcast-Storm"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "show spanning-tree detail | include active|change",
    codeSnippet: "Core_Switch# show interface gi0/1\nGi0/1 is up, line protocol is up\n  Input queue: 1000/75/0/0 (size/max/drops/flushes)\n  Total output drops: 2942048\n  5 minute input rate 989204000 bits/sec, 120485 packets/sec (BROADCAST STORM)",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=STP+BROADCAST"
  },
  {
    title: "FortiOS 7.2 ZTNA Policy Setup",
    description: "Learn how to deploy FortiOS Zero Trust Network Access policies mapping tags to verify security posture and allow authenticated browser gateways.",
    category: "Security Briefing",
    tags: ["FortiGate", "ZTNA", "Security"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "config firewall access-proxy",
    codeSnippet: "config firewall access-proxy\n    edit \"ZTNA_Web_Proxy\"\n        set vip \"ZTNA_VIP\"\n        config api-gateway\n            edit 1\n                set service web\n                set path \"/\"\n            next\n        end\n    next\nend",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=ZTNA+SETUP"
  },
  {
    title: "Wi-Fi 6E Channel Allocation & Tuning",
    description: "Understand 6GHz spectrum planning, dynamic frequency selection profiles, and proper channel widths configuration to minimize overlaps.",
    category: "Tutorial",
    tags: ["Wi-Fi-6E", "Spectrum", "Tuning", "Wireless"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "show ap custom-channel-plan 6ghz",
    codeSnippet: "# Wireless LAN Controller Channel assignment:\nwireless ap profile corp-ap-6g\n  radio 2\n    band 6ghz\n    channel width 80mhz\n    channel auto-assign-profile high-density",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=WIFI+6E+TUNING"
  },
  {
    title: "Auto-Provisioning BGP peers with Nornir",
    description: "Write clean Python network automation programs using Nornir inventory files to configure BGP peer relationships dynamically across 10 core nodes.",
    category: "Automation Lab",
    tags: ["Python", "Nornir", "BGP", "Automation"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    command: "python nornir_bgp.py --conf nornir_config.yaml",
    codeSnippet: "from nornir import InitNornir\nfrom nornir_scrapli.tasks import send_configs\nnr = InitNornir(config_file=\"nornir_config.yaml\")\ndef provision_bgp(task):\n    task.run(task=send_configs, configs=[\"router bgp 65001\", f\"neighbor {task.host['peer_ip']} remote-as 65002\"])\nresult = nr.run(task=provision_bgp)",
    thumbnailUrl: "https://placehold.co/600x400/131314/2ff801?text=NORNIR+BGP"
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB Database...");
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection established.");

    // 1. Clean existing records (Optional - uncomment if you want fresh database)
    console.log("Purging old Projects, Videos, and Categories...");
    await Project.deleteMany({});
    await Video.deleteMany({});
    await Category.deleteMany({});
    console.log("Purge complete.");

    // 2. Insert Categories
    console.log("Inserting Project Categories...");
    const projCats = projectCategories.map(name => ({ name, type: "project" }));
    const insertedProjCats = await Category.insertMany(projCats);
    console.log(`Successfully seeded ${insertedProjCats.length} Project Categories.`);

    console.log("Inserting Video Categories...");
    const vidCats = videoCategories.map(name => ({ name, type: "video" }));
    const insertedVidCats = await Category.insertMany(vidCats);
    console.log(`Successfully seeded ${insertedVidCats.length} Video Categories.`);

    // 3. Insert Projects
    console.log("Inserting Projects...");
    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`Successfully seeded ${insertedProjects.length} Projects.`);

    // 4. Insert Videos
    console.log("Inserting Videos...");
    const insertedVideos = await Video.insertMany(videosData);
    console.log(`Successfully seeded ${insertedVideos.length} Videos.`);

    console.log("\nDATABASE SEEDING SUCCESSFUL!");
    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
}

seed();
