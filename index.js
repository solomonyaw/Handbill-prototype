
/**
 * HANDBILL CORE - Version 2.0
 * Pure Vanilla JavaScript (ES6) - No Frameworks
 */

// --- Global State ---
const state = {
    user: null, // role: 'ADVERTISER' | 'VIEWER'
    currentPage: 'login',
    earnings: 0,
    walletBalance: 0,
    interests: [],
    isAgent: false,
    isWarehouseman: false,
    
    // Core Data
    campaigns: [
        { id: 'c1', title: 'Summer Kente Promo', desc: 'Handwoven Kente at 40% off.', category: 'Fashion', media: 'https://picsum.photos/seed/kente/800/600', clicks: 450, impressions: 12000, cpc: 0.05, budget: 500, status: 'Active' },
        { id: 'c2', title: 'Tech Hub Accra', desc: 'Coding bootcamps starting soon.', category: 'Education', media: 'https://picsum.photos/seed/tech/800/600', clicks: 120, impressions: 5000, cpc: 0.10, budget: 200, status: 'Active' }
    ],
    products: [
        { id: 'p1', name: 'Handmade Leather Shoes', price: 350, commission: 45, qty: 10, location: 'Kumasi', image: 'https://picsum.photos/seed/shoes/400/400' },
        { id: 'p2', name: 'Smart Home Hub', price: 1200, commission: 120, qty: 5, location: 'Accra', image: 'https://picsum.photos/seed/home/400/400' }
    ],
    notifications: [
        { id: 1, text: 'Your campaign "Summer Kente" reached 10k impressions!', date: '2h ago' },
        { id: 2, text: 'New high-reward ad available in Tech.', date: '5h ago' }
    ]
};

// --- Helpers ---
const formatCurrency = (val) => `GH₵${parseFloat(val).toFixed(2)}`;
const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

// --- Branding ---
const getLogoSVG = (size = 40, showText = true, textColorClass = "text-slate-900") => `
    <div class="flex flex-col items-center gap-2">
        <svg width="${size}" height="${size * 1.2}" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-sm">
            <rect x="35" y="10" width="50" height="85" rx="8" fill="#334155" />
            <rect x="40" y="20" width="40" height="65" rx="2" fill="#BE123C" />
            <text x="60" y="65" font-size="40" font-weight="bold" fill="white" text-anchor="middle" style="font-family: serif">$</text>
            <circle cx="60" cy="90" r="3" fill="white" opacity="0.5" />
            <path d="M35 45 C15 45 10 70 10 90 C10 110 30 115 50 110 L50 100 C35 105 25 100 25 90 C25 80 35 75 35 75 Z" fill="#E11D48" />
            <rect x="80" y="35" width="12" height="10" rx="5" fill="#E11D48" />
            <rect x="83" y="48" width="12" height="10" rx="5" fill="#E11D48" />
        </svg>
        ${showText ? `<div class="text-center leading-tight"><h1 class="text-xl font-bold ${textColorClass} serif-brand">Handbill</h1><p class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">mobiapp</p></div>` : ''}
    </div>
`;

// --- Navigation & Core Logic ---
window.navigate = (page) => { state.currentPage = page; render(); };
window.handleLogout = () => { state.user = null; state.currentPage = 'login'; render(); };

window.handleLogin = (role) => {
    state.user = {
        name: role === 'ADVERTISER' ? 'Kojo Advert' : 'Amma Viewer',
        role: role,
        email: role.toLowerCase() + '@handbill.com.gh'
    };
    state.currentPage = role === 'ADVERTISER' ? 'advertiser-home' : 'viewer-home';
    state.walletBalance = role === 'ADVERTISER' ? 1500 : 12.50;
    render();
};

window.applyRole = (roleType) => {
    if (roleType === 'AGENT') state.isAgent = true;
    if (roleType === 'WAREHOUSE') state.isWarehouseman = true;
    alert(`Success! You are now a verified ${roleType}.`);
    render();
};

window.earnReward = (amount = 0.15) => {
    state.earnings += amount;
    state.walletBalance += amount;
    render();
};

// --- Templates ---

const loginTemplate = () => `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div class="bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-12 relative overflow-hidden animate-fade-in">
            <div class="absolute top-0 left-0 w-full h-2 bg-rose-600"></div>
            <div class="text-center mb-12">
                ${getLogoSVG(100)}
                <p class="text-slate-500 mt-6 text-sm font-medium italic">Connecting Ghana's Commerce</p>
            </div>
            <div class="space-y-4">
                <button onclick="handleLogin('ADVERTISER')" class="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-xl">
                    <i data-lucide="briefcase"></i> Advertiser Portal
                </button>
                <button onclick="handleLogin('VIEWER')" class="w-full py-5 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-rose-900/20 active:scale-[0.98]">
                    <i data-lucide="eye"></i> Ad Viewer Access
                </button>
            </div>
        </div>
    </div>
`;

const sidebarTemplate = () => {
    const isAds = state.user.role === 'ADVERTISER';
    let items = isAds ? [
        { id: 'advertiser-home', label: 'Dashboard', icon: 'layout-dashboard' },
        { id: 'publish-ad', label: 'Publish Ad', icon: 'send' },
        { id: 'advertiser-wallet', label: 'Wallet', icon: 'wallet' },
        { id: 'advertiser-analytics', label: 'Analytics', icon: 'bar-chart-2' }
    ] : [
        { id: 'viewer-home', label: 'Ad Feed', icon: 'smartphone' },
        { id: 'viewer-wallet', label: 'My Earnings', icon: 'dollar-sign' },
        { id: 'history', label: 'History', icon: 'clock' }
    ];

    if (isAds && state.isWarehouseman) items.push({ id: 'warehouse-dashboard', label: 'Warehouse', icon: 'package' });
    if (!isAds && state.isAgent) items.push({ id: 'agent-portal', label: 'Agent Portal', icon: 'users' });

    return `
        <div class="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col fixed left-0 top-0 border-r border-slate-800 z-50">
            <div class="mb-12 flex items-center gap-3 px-2">
                ${getLogoSVG(32, false)}
                <div class="leading-tight">
                    <h1 class="text-xl font-bold text-white serif-brand">Handbill</h1>
                    <p class="text-[8px] uppercase tracking-[0.2em] text-rose-500 font-black">CORE V2</p>
                </div>
            </div>
            <nav class="flex-1 space-y-2">
                ${items.map(item => `
                    <button onclick="navigate('${item.id}')" class="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${state.currentPage === item.id ? 'active-nav-item' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}">
                        <i data-lucide="${item.icon}" size="18"></i>
                        <span class="font-bold text-[11px] uppercase tracking-widest">${item.label}</span>
                    </button>
                `).join('')}
            </nav>
            <div class="pt-6 border-t border-slate-800 space-y-2">
                <button onclick="navigate('profile')" class="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors">
                    <i data-lucide="user" size="18"></i> <span class="font-bold text-[11px] uppercase tracking-widest">Profile</span>
                </button>
                <button onclick="handleLogout()" class="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-rose-400 hover:bg-rose-900/20 transition-colors">
                    <i data-lucide="log-out" size="18"></i> <span class="font-bold text-[11px] uppercase tracking-widest">Logout</span>
                </button>
            </div>
        </div>
    `;
};

const advertiserHomeTemplate = () => `
    <div class="space-y-10 animate-fade-in">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h2 class="text-4xl font-black text-slate-900 serif-brand uppercase tracking-tighter">HQ Overview</h2>
                <p class="text-slate-500 font-medium">Monitoring your active network in Ghana.</p>
            </div>
            <div class="flex gap-4">
                <button onclick="navigate('publish-ad')" class="bg-rose-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-900/10 hover:-translate-y-1 transition-all">
                    Launch New Ad
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            ${[
                { label: 'Active Campaigns', val: state.campaigns.length, icon: 'layers' },
                { label: 'Network Reach', val: '142.5k', icon: 'radio' },
                { label: 'Total Clicks', val: '12,042', icon: 'mouse-pointer' },
                { label: 'Wallet Balance', val: formatCurrency(state.walletBalance), icon: 'wallet', highlight: true }
            ].map(stat => `
                <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <i data-lucide="${stat.icon}" class="${stat.highlight ? 'text-rose-600' : 'text-slate-400'}" size="20"></i>
                        <span class="text-[9px] font-black uppercase text-slate-300 tracking-widest">Live</span>
                    </div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">${stat.label}</p>
                    <h4 class="text-2xl font-black ${stat.highlight ? 'text-rose-600' : 'text-slate-900'}">${stat.val}</h4>
                </div>
            `).join('')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100">
                <div class="flex justify-between items-center mb-10">
                    <h3 class="font-black text-xs uppercase tracking-widest text-slate-900">Performance Index</h3>
                    <select class="text-[10px] font-bold border-none bg-slate-50 rounded-lg px-3 py-1 outline-none"><option>Last 7 Days</option></select>
                </div>
                <div class="h-48 flex items-end gap-3 px-4">
                    ${[40, 70, 45, 90, 65, 80, 50, 85, 60, 95].map(h => `
                        <div class="flex-1 bg-slate-50 rounded-t-xl relative group">
                            <div class="absolute bottom-0 w-full bg-rose-500 rounded-t-xl transition-all duration-700" style="height: ${h}%"></div>
                        </div>
                    `).join('')}
                </div>
                <div class="flex justify-between mt-6 px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>
            
            <div class="bg-white p-10 rounded-[3rem] border border-slate-100">
                <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-8">Role Expansion</h3>
                <div class="p-6 bg-rose-50 rounded-3xl mb-6">
                    <h4 class="font-black text-rose-900 text-sm mb-2">Become a Warehouseman</h4>
                    <p class="text-[10px] text-rose-700/70 mb-4 leading-relaxed">List physical products for agents to sell and earn higher ROI.</p>
                    <button onclick="applyRole('WAREHOUSE')" class="w-full py-3 bg-rose-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest">Apply Now</button>
                </div>
                <div class="space-y-4">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Alerts</p>
                    ${state.notifications.map(n => `
                        <div class="flex items-start gap-4 p-4 border border-slate-50 rounded-2xl">
                            <div class="w-2 h-2 rounded-full bg-rose-500 mt-1"></div>
                            <div>
                                <p class="text-[11px] font-bold text-slate-800 leading-tight">${n.text}</p>
                                <p class="text-[9px] text-slate-400 mt-1 uppercase font-black">${n.date}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
`;

const publishAdTemplate = () => `
    <div class="max-w-4xl mx-auto animate-fade-in pb-20">
        <div class="mb-10">
            <h2 class="text-3xl font-black text-slate-900 serif-brand uppercase">Ad Builder</h2>
            <p class="text-slate-500">Create high-impact campaigns for the Ghana market.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div class="lg:col-span-2 space-y-8">
                <div class="bg-white p-10 rounded-[3rem] border border-slate-100 space-y-8">
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Basic Information</label>
                        <input type="text" placeholder="Campaign Title (e.g. Back-to-School Promo)" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none">
                        <textarea placeholder="Ad Description..." class="w-full mt-4 px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm h-32 outline-none focus:ring-2 focus:ring-rose-500"></textarea>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Category</label>
                            <select class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none">
                                <option>Fashion</option><option>Tech</option><option>Food</option><option>Education</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Call to Action</label>
                            <select class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none">
                                <option>Shop Now</option><option>Learn More</option><option>Sign Up</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Targeting (Ghana Regions)</label>
                        <div class="flex flex-wrap gap-2">
                            ${['Greater Accra', 'Ashanti', 'Central', 'Western', 'Northern'].map(r => `
                                <button class="px-4 py-2 border border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">${r}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="bg-white p-10 rounded-[3rem] border border-slate-100 space-y-6">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget & Bidding</label>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <p class="text-[9px] text-slate-400 font-black uppercase mb-2">Cost Per Click (CPC)</p>
                            <input type="number" value="0.05" step="0.01" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none">
                        </div>
                        <div>
                            <p class="text-[9px] text-slate-400 font-black uppercase mb-2">Total Budget (GH₵)</p>
                            <input type="number" placeholder="500" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none">
                        </div>
                    </div>
                    <div class="p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <div class="flex justify-between text-[11px] font-bold text-slate-600 mb-2">
                            <span>Estimated Clicks:</span> <span class="text-slate-900">~10,000</span>
                        </div>
                        <div class="flex justify-between text-[11px] font-bold text-slate-600">
                            <span>Platform Fee:</span> <span class="text-rose-600">GH₵10.00</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative">
                    <div class="absolute -top-10 -right-10 w-40 h-40 bg-rose-600 rounded-full blur-3xl opacity-20"></div>
                    <h3 class="font-black text-xs uppercase tracking-widest mb-6">Ad Preview</h3>
                    <div class="aspect-video bg-slate-800 rounded-2xl mb-4 overflow-hidden border border-slate-700">
                        <img src="https://picsum.photos/seed/preview/800/600" class="w-full h-full object-cover">
                    </div>
                    <p class="font-bold text-sm mb-2">Your Ad Title Here</p>
                    <p class="text-[10px] text-slate-400 line-clamp-2">The description of your campaign will appear here as users browse the feed.</p>
                </div>
                
                <button onclick="navigate('advertiser-home')" class="w-full py-5 bg-rose-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-rose-900/20 active:scale-95 transition-all">
                    Launch Campaign
                </button>
            </div>
        </div>
    </div>
`;

const viewerHomeTemplate = () => `
    <div class="max-w-4xl mx-auto animate-fade-in space-y-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
                <h1 class="text-4xl font-black text-slate-900 serif-brand uppercase leading-tight">Your Handbills</h1>
                <p class="text-slate-500 font-medium mt-2">Personalized deals waiting for you.</p>
            </div>
            <div class="bg-white p-6 px-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-rose-900/5 flex items-center gap-6">
                <div class="w-14 h-14 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center">
                    <i data-lucide="award" size="28"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Earned</p>
                    <p class="text-3xl font-black text-slate-900 leading-none mt-1">${formatCurrency(state.earnings)}</p>
                </div>
                <button class="ml-4 px-8 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all">Redeem</button>
            </div>
        </div>

        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            ${['All', 'Fashion', 'Tech', 'Food', 'Events', 'Real Estate'].map(cat => `
                <button class="px-8 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all whitespace-nowrap">${cat}</button>
            `).join('')}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            ${state.campaigns.map(c => `
                <div class="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl group hover:-translate-y-2 transition-all duration-500">
                    <div class="relative aspect-[4/3] overflow-hidden">
                        <img src="${c.media}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                            <div>
                                <span class="px-4 py-1.5 bg-rose-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest mb-4 inline-block">${c.category}</span>
                                <h3 class="text-white text-2xl font-bold leading-tight drop-shadow-lg">${c.title}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="p-10">
                        <p class="text-slate-500 text-sm mb-10 leading-relaxed line-clamp-2">${c.desc}</p>
                        <div class="flex items-center justify-between pt-8 border-t border-slate-50">
                            <div class="flex gap-4 text-slate-300">
                                <i data-lucide="heart" size="18" class="cursor-pointer hover:text-rose-500 transition-colors"></i>
                                <i data-lucide="share-2" size="18" class="cursor-pointer hover:text-slate-900 transition-colors"></i>
                            </div>
                            <button onclick="earnReward()" class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl active:scale-95 flex items-center gap-3">
                                View Deal <i data-lucide="plus" size="14"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        ${!state.isAgent ? `
            <div class="bg-slate-900 p-16 rounded-[3rem] text-center relative overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
                <h3 class="text-3xl font-black text-white serif-brand uppercase mb-4 tracking-tighter">Monetize Your Influence</h3>
                <p class="text-slate-400 max-w-md mx-auto mb-10 text-sm leading-relaxed">Become a Handbill Agent today. Sell products from verified warehouses and earn instant commissions.</p>
                <button onclick="applyRole('AGENT')" class="px-12 py-5 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-rose-900/20 hover:bg-rose-700 transition-all">Become an Agent</button>
            </div>
        ` : ''}
    </div>
`;

const agentPortalTemplate = () => `
    <div class="space-y-12 animate-fade-in pb-20">
        <div class="flex justify-between items-end">
            <div>
                <h2 class="text-4xl font-black text-slate-900 serif-brand uppercase tracking-tighter">Agent Terminal</h2>
                <p class="text-slate-500 font-medium mt-2">Active listings for promotion.</p>
            </div>
            <div class="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                <i data-lucide="shield-check" size="16"></i> Verified Agent
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${state.products.map(p => `
                <div class="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                    <div class="aspect-square relative overflow-hidden">
                        <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        <div class="absolute top-6 left-6 bg-emerald-500 text-white px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl">
                            ${formatCurrency(p.commission)} Com.
                        </div>
                    </div>
                    <div class="p-8">
                        <h4 class="font-black text-slate-900 text-lg mb-1">${p.name}</h4>
                        <div class="flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-widest mb-6">
                            <i data-lucide="map-pin" size="12"></i> ${p.location}
                        </div>
                        <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                            <div>
                                <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest">Price</p>
                                <p class="text-xl font-black text-slate-900">${formatCurrency(p.price)}</p>
                            </div>
                            <button class="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-xl">
                                Sell Product
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`;

// --- Rendering Engine ---

function render() {
    const root = document.getElementById('app');
    if (!root) return;

    if (state.currentPage === 'login') {
        root.innerHTML = loginTemplate();
    } else {
        let contentHtml = '';
        switch (state.currentPage) {
            case 'advertiser-home': contentHtml = advertiserHomeTemplate(); break;
            case 'viewer-home': contentHtml = viewerHomeTemplate(); break;
            case 'publish-ad': contentHtml = publishAdTemplate(); break;
            case 'agent-portal': contentHtml = agentPortalTemplate(); break;
            case 'warehouse-dashboard':
                contentHtml = `<div class="p-20 text-center"><i data-lucide="package" size="80" class="mx-auto text-slate-200 mb-6"></i><h2 class="text-3xl font-black text-slate-900 serif-brand uppercase mb-4">Warehouse HQ</h2><p class="text-slate-500 mb-10">Add and manage your physical stock.</p><button onclick="navigate('advertiser-home')" class="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">Back to Dashboard</button></div>`;
                break;
            default:
                contentHtml = `<div class="flex flex-col items-center justify-center min-h-[60vh] text-slate-200"><i data-lucide="settings" size="80" class="mb-6 animate-spin duration-[10s] opacity-20"></i><h2 class="text-2xl font-black text-slate-400 uppercase tracking-widest serif-brand">Offline Node</h2><button onclick="navigate('${state.user.role === 'ADVERTISER' ? 'advertiser-home' : 'viewer-home'}')" class="mt-8 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all shadow-xl">Back to Base</button></div>`;
        }

        root.innerHTML = `
            <div class="min-h-screen bg-slate-50">
                ${sidebarTemplate()}
                <header class="h-20 bg-white border-b border-slate-100 fixed top-0 left-64 right-0 z-40 flex items-center justify-between px-10">
                    <div class="flex-1 max-w-xl">
                        <div class="relative group">
                            <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size="18"></i>
                            <input type="text" placeholder="Search the network..." class="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-rose-500 outline-none transition-all">
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <button class="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-50 rounded-xl transition-colors relative">
                            <i data-lucide="bell" size="20"></i>
                            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div class="flex items-center gap-4 ml-2 border-l border-slate-100 pl-6">
                            <div class="text-right hidden sm:block">
                                <p class="text-[11px] font-black text-slate-900 uppercase tracking-widest">${state.user.name}</p>
                                <p class="text-[9px] text-rose-500 font-bold uppercase tracking-widest">${state.user.role}</p>
                            </div>
                            <div class="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs border-2 border-rose-500 shadow-lg">${getInitials(state.user.name)}</div>
                        </div>
                    </div>
                </header>
                <main class="ml-64 pt-28 p-10 min-h-screen">
                    ${contentHtml}
                </main>
            </div>
        `;
    }

    if (window.lucide) window.lucide.createIcons();
}

// --- Global Assignments ---
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.navigate = navigate;
window.earnReward = earnReward;
window.applyRole = applyRole;

document.addEventListener('DOMContentLoaded', render);
