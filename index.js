
/**
 * HANDBILL CORE - Pure Vanilla JavaScript (ES6)
 * No Frameworks. No TypeScript Syntax. 100% Native.
 */

// --- Global State ---
const state = {
    user: null,
    currentPage: 'login',
    earnings: 0,
    searchQuery: '',
    campaigns: [
        {
            id: '1',
            title: 'Summer Fashion Promo',
            description: 'Get up to 50% off on all summer collections in Ghana!',
            mediaUrl: 'https://picsum.photos/800/600?random=1',
            category: 'Fashion',
            clicks: 450,
            impressions: 12500
        },
        {
            id: '2',
            title: 'Tech Expo 2024',
            description: 'The biggest tech event in West Africa. Join us for 3 days of innovation.',
            mediaUrl: 'https://picsum.photos/800/600?random=2',
            category: 'Technology',
            clicks: 120,
            impressions: 5000
        }
    ],
    products: [
        {
            id: 'p1',
            name: 'Wireless Headphones X-200',
            price: 250,
            commission: 15,
            imageUrl: 'https://picsum.photos/400/400?random=10',
            address: 'Spintex Road, Accra'
        },
        {
            id: 'p2',
            name: 'Smart Watch Pro',
            price: 400,
            commission: 30,
            imageUrl: 'https://picsum.photos/400/400?random=11',
            address: 'Adum, Kumasi'
        }
    ]
};

// --- Branding Component ---
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
            <rect x="83" y="61" width="12" height="10" rx="5" fill="#E11D48" />
            <rect x="80" y="74" width="12" height="10" rx="5" fill="#E11D48" />
        </svg>
        ${showText ? `
            <div class="text-center leading-tight">
                <h1 class="text-xl font-bold ${textColorClass} serif-brand">Handbill</h1>
                <p class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">mobiapp</p>
            </div>
        ` : ''}
    </div>
`;

// --- Navigation Logic ---
window.navigate = (page) => {
    state.currentPage = page;
    render();
};

window.handleLogin = (role) => {
    state.user = {
        name: role === 'ADVERTISER' ? 'Akwasi Ads' : 'Yaw Viewer',
        role: role,
        balance: role === 'ADVERTISER' ? 1000 : 25.50
    };
    state.currentPage = role === 'ADVERTISER' ? 'advertiser-home' : 'viewer-home';
    render();
};

window.handleLogout = () => {
    state.user = null;
    state.currentPage = 'login';
    render();
};

window.earnReward = () => {
    state.earnings += 0.25;
    render();
};

// --- Templates ---

const loginTemplate = () => `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-10 relative overflow-hidden animate-fade-in">
            <div class="absolute top-0 left-0 w-full h-2 bg-rose-600"></div>
            <div class="text-center mb-10">
                ${getLogoSVG(80)}
                <p class="text-slate-500 mt-4 text-sm font-medium">Empowering the Ghanaian marketplace</p>
            </div>
            <div class="space-y-4">
                <button onclick="handleLogin('ADVERTISER')" class="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                    <i data-lucide="layout-dashboard"></i> Enter as Advertiser
                </button>
                <button onclick="handleLogin('VIEWER')" class="w-full py-5 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-rose-200 active:scale-[0.98]">
                    <i data-lucide="users"></i> Enter as Ad Viewer
                </button>
            </div>
            <div class="mt-8 pt-6 border-t border-slate-100 text-center">
                <p class="text-sm text-slate-500">Don't have an account? <span class="text-rose-600 font-bold cursor-pointer hover:underline">Sign Up</span></p>
            </div>
        </div>
    </div>
`;

const sidebarTemplate = () => {
    const isAds = state.user.role === 'ADVERTISER';
    const items = isAds ? [
        { id: 'advertiser-home', label: 'Dashboard', icon: 'layout-dashboard' },
        { id: 'create-ad', label: 'Create Ad', icon: 'plus-circle' },
        { id: 'analytics', label: 'Analytics', icon: 'bar-chart-3' },
        { id: 'warehouse', label: 'Warehouse', icon: 'package' },
        { id: 'wallet', label: 'Wallet', icon: 'wallet' }
    ] : [
        { id: 'viewer-home', label: 'Home Feed', icon: 'home' },
        { id: 'trending', label: 'Trending', icon: 'trending-up' },
        { id: 'agent-portal', label: 'Agent Portal', icon: 'users' },
        { id: 'history', label: 'History', icon: 'history' },
        { id: 'viewer-wallet', label: 'Earnings', icon: 'wallet' }
    ];

    return `
        <div class="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col fixed left-0 top-0 border-r border-slate-800">
            <div class="mb-10 px-2 flex items-center justify-start">
                <div class="flex items-center gap-3">
                    ${getLogoSVG(32, false)}
                    <div class="leading-tight">
                        <h1 class="text-xl font-bold text-white serif-brand">Handbill</h1>
                        <p class="text-[8px] uppercase tracking-[0.2em] text-slate-500 font-black">mobiapp</p>
                    </div>
                </div>
            </div>
            <nav class="flex-1 space-y-1">
                ${items.map(item => `
                    <button onclick="navigate('${item.id}')" class="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${state.currentPage === item.id ? 'active-nav-item' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}">
                        <i data-lucide="${item.icon}" size="20"></i>
                        <span class="font-bold text-sm tracking-wide">${item.label}</span>
                    </button>
                `).join('')}
            </nav>
            <div class="pt-4 border-t border-slate-800 space-y-1">
                <button onclick="navigate('profile')" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                    <i data-lucide="user"></i> <span class="font-bold text-sm tracking-wide">Profile</span>
                </button>
                <button onclick="handleLogout()" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                    <i data-lucide="log-out"></i> <span class="font-bold text-sm tracking-wide">Logout</span>
                </button>
            </div>
        </div>
    `;
};

const headerTemplate = () => `
    <header class="h-16 bg-white border-b border-slate-200 fixed top-0 left-64 right-0 z-10 flex items-center justify-between px-8">
        <div class="flex-1 max-w-xl">
            <div class="relative">
                <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size="18"></i>
                <input type="text" placeholder="Search Ghana's handbills..." class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full focus:ring-2 focus:ring-rose-500 outline-none transition-all">
            </div>
        </div>
        <div class="flex items-center gap-4">
            <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
                <i data-lucide="bell"></i>
                <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div class="flex items-center gap-3 ml-4">
                <div class="text-right hidden sm:block">
                    <p class="text-sm font-bold text-slate-900">${state.user.name}</p>
                    <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">${state.user.role === 'ADVERTISER' ? 'Advertiser' : 'Ad Viewer'}</p>
                </div>
                <img src="https://picsum.photos/seed/${state.user.name}/100" class="w-10 h-10 rounded-full border-2 border-rose-500 shadow-sm" alt="Avatar">
            </div>
        </div>
    </header>
`;

const advertiserDashboardTemplate = () => `
    <div class="space-y-8 animate-fade-in">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-black text-slate-900 serif-brand">Dashboard</h1>
                <p class="text-slate-500">Business overview for ${state.user.name.split(' ')[0]}.</p>
            </div>
            <button onclick="navigate('create-ad')" class="bg-rose-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/10 flex items-center gap-3">
                <i data-lucide="plus-circle" size="18"></i> New Campaign
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Ads</p>
                <h4 class="text-3xl font-black text-slate-900">12</h4>
            </div>
            <div class="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Impressions</p>
                <h4 class="text-3xl font-black text-slate-900">1.2M</h4>
            </div>
            <div class="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clicks</p>
                <h4 class="text-3xl font-black text-slate-900">45.2K</h4>
            </div>
            <div class="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Wallet Balance</p>
                <h4 class="text-3xl font-black text-rose-600">$${state.user.balance}</h4>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 class="font-black text-slate-900 mb-8 flex items-center justify-between uppercase tracking-widest text-xs">
                    Network Growth
                    <span class="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest">+12.5%</span>
                </h3>
                <div class="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-slate-100">
                    ${[30, 60, 40, 85, 55, 75, 50, 90, 65, 80].map(h => `
                        <div class="w-full bg-slate-100 rounded-t-xl group relative cursor-pointer">
                            <div class="absolute bottom-0 left-0 w-full bg-rose-500 rounded-t-xl transition-all duration-500 group-hover:bg-rose-600" style="height: ${h}%"></div>
                        </div>
                    `).join('')}
                </div>
                <div class="flex justify-between mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                    <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span>
                </div>
            </div>
            
            <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 class="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Top Performing</h3>
                <div class="space-y-6">
                    ${state.campaigns.map(c => `
                        <div class="flex items-center gap-5 group cursor-pointer">
                            <div class="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
                                <img src="${c.mediaUrl}" class="w-full h-full object-cover transition-transform group-hover:scale-110">
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-slate-900 truncate text-sm">${c.title}</p>
                                <div class="flex items-center gap-2 mt-0.5">
                                    <span class="text-[10px] text-emerald-600 font-bold">${c.clicks} clicks</span>
                                    <span class="text-[10px] text-slate-300">•</span>
                                    <span class="text-[10px] text-slate-400 font-bold">${((c.clicks/c.impressions)*100).toFixed(1)}% CTR</span>
                                </div>
                            </div>
                            <i data-lucide="trending-up" class="text-rose-500" size="16"></i>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
`;

const viewerHomeTemplate = () => `
    <div class="max-w-4xl mx-auto space-y-10 animate-fade-in">
        <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div>
                <h1 class="text-4xl font-black text-slate-900 serif-brand leading-tight">Ghana's Handbills</h1>
                <p class="text-slate-500 mt-2 font-medium">Earn real rewards for discovering local brands.</p>
            </div>
            <div class="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-rose-900/5 flex items-center gap-5">
                <div class="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-inner">
                    <i data-lucide="dollar-sign" size="30"></i>
                </div>
                <div>
                    <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">Earnings</p>
                    <p class="text-2xl font-black text-slate-900 leading-none mt-1">GH₵${state.earnings.toFixed(2)}</p>
                </div>
                <button class="ml-2 px-8 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 shadow-xl shadow-rose-200 transition-all active:scale-95">
                    Redeem
                </button>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            ${state.campaigns.map(c => `
                <div class="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group transition-all hover:-translate-y-3">
                    <div class="relative aspect-[4/3] overflow-hidden">
                        <img src="${c.mediaUrl}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                            <div class="w-full">
                                <span class="inline-block px-4 py-1.5 bg-rose-600 text-white text-[10px] font-black rounded-full mb-4 uppercase tracking-widest shadow-lg">${c.category}</span>
                                <h3 class="text-white text-2xl font-bold leading-tight drop-shadow-md">${c.title}</h3>
                            </div>
                        </div>
                        <button class="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur-2xl rounded-full text-white hover:bg-rose-600 border border-white/20 transition-all shadow-xl">
                            <i data-lucide="heart"></i>
                        </button>
                    </div>
                    <div class="p-8">
                        <p class="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-8 font-medium">
                            ${c.description}
                        </p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <span class="flex items-center gap-2 hover:text-rose-500 transition-colors cursor-pointer"><i data-lucide="heart" size="16"></i> 1.2k</span>
                                <span class="flex items-center gap-2 hover:text-slate-900 transition-colors cursor-pointer"><i data-lucide="share-2" size="16"></i> 45</span>
                            </div>
                            <button onclick="earnReward()" class="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 shadow-2xl shadow-rose-900/10 transition-all active:scale-95 flex items-center gap-3">
                                View & Earn <i data-lucide="plus-circle" size="16"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`;

const agentPortalTemplate = () => `
    <div class="space-y-10 animate-fade-in">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-black text-slate-900 serif-brand uppercase tracking-tight">Agent Portal</h1>
                <p class="text-slate-500 font-medium">Earn huge commissions as a verified Handbill agent.</p>
            </div>
            <button class="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 shadow-2xl shadow-emerald-900/10 flex items-center gap-3 transition-all">
                <i data-lucide="package" size="18"></i> New Agent Listing
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            ${state.products.map(p => `
                <div class="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all group">
                    <div class="aspect-square relative overflow-hidden">
                        <img src="${p.imageUrl}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                        <div class="absolute top-6 left-6 bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                            GH₵${p.commission} Agent Pay
                        </div>
                    </div>
                    <div class="p-8">
                        <h4 class="font-black text-slate-900 mb-1 text-xl">${p.name}</h4>
                        <p class="text-[10px] text-slate-400 mb-8 flex items-center gap-2 font-black uppercase tracking-widest">
                            <i data-lucide="map-pin" size="12" class="text-slate-300"></i> ${p.address}
                        </p>
                        <div class="flex items-center justify-between pt-8 border-t border-slate-100">
                            <div>
                                <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">Price</p>
                                <p class="text-2xl font-black text-slate-900 mt-1">GH₵${p.price}</p>
                            </div>
                            <button class="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-xl">
                                Sell Now
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
            case 'advertiser-home': contentHtml = advertiserDashboardTemplate(); break;
            case 'viewer-home': contentHtml = viewerHomeTemplate(); break;
            case 'agent-portal': contentHtml = agentPortalTemplate(); break;
            case 'create-ad':
                contentHtml = `
                    <div class="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-16 border border-slate-200 shadow-2xl animate-fade-in text-center relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-48 h-48 bg-rose-50 rounded-full -mr-24 -mt-24 blur-3xl opacity-50"></div>
                        <div class="mb-10 flex justify-center">${getLogoSVG(120, false)}</div>
                        <h2 class="text-4xl font-black text-slate-900 mb-4 serif-brand uppercase">Builder</h2>
                        <p class="text-slate-500 mb-12 font-medium max-w-sm mx-auto">This feature is currently being optimized for the Ghanaian mobile network.</p>
                        <button onclick="navigate('advertiser-home')" class="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all shadow-2xl shadow-rose-900/10 active:scale-95">
                            Return to HQ
                        </button>
                    </div>
                `;
                break;
            default:
                contentHtml = `
                    <div class="flex flex-col items-center justify-center min-h-[60vh] text-slate-200">
                        <i data-lucide="settings" size="100" class="mb-8 animate-spin duration-[20s] opacity-20"></i>
                        <h2 class="text-3xl font-black text-slate-400 uppercase tracking-widest serif-brand">Station Offline</h2>
                        <button onclick="navigate('${state.user.role === 'ADVERTISER' ? 'advertiser-home' : 'viewer-home'}')" class="mt-10 px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all shadow-2xl">
                            Back to Base
                        </button>
                    </div>
                `;
        }

        root.innerHTML = `
            <div class="min-h-screen bg-slate-50">
                ${sidebarTemplate()}
                ${headerTemplate()}
                <main class="ml-64 pt-24 p-8 min-h-screen">
                    ${contentHtml}
                </main>
            </div>
        `;
    }

    // Refresh Lucide Icons after every render
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// --- Bootstrap ---
document.addEventListener('DOMContentLoaded', () => {
    render();
});
