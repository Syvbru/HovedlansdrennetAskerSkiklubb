import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function sha256(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

const USER_CREDENTIALS = {
    "c23ad6f18412014673b2d04794ca038ef6767fe94afe408dffb775362fe07e68": {
        hash: "6d863b64bafc62018b1c466956eaadc555cbc67a5789cefd4722f741e327d964",
        sheetUrl: "https://docs.google.com/spreadsheets/d/16g9Dj6gGqJdMf4OzF3jfw18bbm7pAaQZSDiszGlH-a0/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/12qskHnbueZihgTY9W0G8Add6-QqXrdur4-8HQebhxNE/edit?usp=sharing",
    },
    "cf43e029efe6476e1f7f84691f89c876818610c2eaeaeb881103790a48745b82": {
        hash: "3bc76a6a8cb1677a34570a65fca1441489ab501af7532e00c610f27d9fc6270b",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1Pi3QHuVMCsAumEnXpiJiEWa6JJpP0mrqFf8RTTyqRdU/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1muO0khOrLokmqQzctLd9soxx1BdC-DujSBf1wE9ttMg/edit?usp=sharing",
    },
    "55579b557896d0ce1764c47fed644f9b35f58bad620674af23f356d80ed0c503": {
        hash: "8391f25eb7d2949f4b7a9207f6fc94212dfacc86d4c41d85306a75b866f003c8",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1rR3Rq28Z4qvz2NmhcQ3rPtxo0vaDkqftuoye49LfOOY/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1Zet3QXpoyMdZqK_PcyhZmSygKz0wmtxQIMUS92XHVDk/edit?usp=sharing",
    },
    "4e7c524ef47cc92470c4beb25253005553f9668108f7ed26f2f8e7c84a63ef57": {
        hash: "745f44990eeb9c23f4f293fcc70466307c3579e4c2d2eb7d2caea054c4e7d9dc",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1hDBeNcskUDIkPvEM-uWixS1ACuEqmDQINR3l4Fn1IXE/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1ChVV2eDSV4T5v5-z_xo7ClsT97-jhGmYWDDmaeiapRc/edit?usp=sharing",
    },
    "bb6b24bf13999272b27006f7711965f77861a326a30b43b9b1852a500ad68ac7": {
        hash: "af9d54ad9a4f1de490b9ab9f8a92bd7fb373145c23c13b18708533c22cecf0c4",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1opK9rNmWS9pbADnllMAsXtIB_DuhC_OLHv3EwkBWAk8/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1mbzoviLpWKu1OHJ74oSbWtYCrFb3AVyYMuVJpA2Gbhk/edit?usp=sharing",
    },
    "744292c9f3d49b0159ff487366857d4c0ebd4c5e9eb77264d2b6e42477cee3fd": {
        hash: "d890a9b3d7ad22a2923aaa5ab3350fedbce6e2d487bc69427446ecd7d390b5d0",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1RGNvnnCIpdsBiNYd_dYTVWjm1kS2ToP-YISKUGZYaxk/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1rtSnO_f5OsR82wnOpmK_OzkqdamfNmdS4Kb26qBagSk/edit?usp=sharing",
    },
    "b025079c90813d4669136b2ed07512204ee05522ba3e647935f1a88daf00fd43": {
        hash: "addc8429adebe661f7539e7e7ebde318ef2ed2810f2a30d36ce70f130afb24f4",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1X6Xg-Wr11LOsMvbDOg7b8F8LB9CeKWmn5tWlN3fGJLk/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1CDt3N7MT7iZl-K92Bm7l094W2fOQ5XtOpVf9_namZGE/edit?usp=sharing",
    },
    "7db9d8e2af6fff877ca5878135e99c758ec72bf2ec34dd287bb470203a416560": {
        hash: "7a57201147a208f81a0c07a8656b1f96d184eb9fec337f9f4aacb9e70d5c092e",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1Esgt4ZdoE5f9mYL6OdjYA89jgZLrWso4Kf-fTBxDirU/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1y0sAYEJLbeSVHo0Rm2mmEODu0pA81kRiIbfc_lmuM6M/edit?usp=sharing",
    },
    "9a56829452acf473c7c9c6c234aa7c88f0cd03342e15a7d41436dd2ec037f9b3": {
        hash: "75dbb91b5c7c13b386a98adb48b0bc6792baa5b4aed26013529bab2243db73ed",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1715BYi3BZqy-qVZdBh3rlC1iRl2ORXpEb5S5zPbiOko/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1OZYEN7Qj4aZn7NgW_fQlMEjW1Omy8G5X0PuzBkXw-XU/edit?usp=sharing",
    },
    "0ab0265842a1c7d13851133349d241e2a8254a56bef1d4750eab7bc620158a65": {
        hash: "e1c7acc3614ce9607b6d5112a29fead5fa288ba7b9e0d8451505f0f3fbb39c42",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1_C2dH6nMPxVmXn_x8rg7Ew0ncghdkC2PnHHhAA0jHOs/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1yu7ae98PoL6k8W9rwhvbsPQNTRovGj8hlshkuyPlgOk/edit?usp=sharing",
    },
    "b21ec07effd3fe307782e2a1782ae771e601b303cef1548723a76c539f98f383": {
        hash: "a8ee8a9cbeb5e6465e25cd2272a6fbade33a1b1b3e93863b78bcfda9efcd0756",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1S52QH21wq0IH-LKUgwZ9PIaRULaUIQADtYXzGzxiuAQ/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1Xn_h9_H0b7UWCogxx-iW3pvhRP1j0fozzS06jiOnInc/edit?usp=sharing",
    },
    "f5a1971c2ef02a5ab2263f20895b14e7ac1607d21d28805ca8a7ed31ef802364": {
        hash: "aed945bb882e87048fc7ce03dc6a42806a86b00a3a8c19a9c1993de55ef16acd",
        sheetUrl: "https://docs.google.com/spreadsheets/d/16MiHhFJ-d5wo_aD7-Z2b55-05hWIH5BzeZJQMA134ms/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1fmrOhZFoZ7mHTnGgtJOrgcwY1LN-SWEu1ju-dyEGMP4/edit?usp=sharing",
    },
    "ce11bb4c2b13a52f6586db347a43678090a75e2011c7dc0d12caac4b16244447": {
        hash: "500d220e03d172928c667670df3fa79093f6d0631face13ba9e289870a322706",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1tA7eFUyN800TyN1K6gWWqe3TzUO0tTGtHQcWB7TR0io/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1tdxOPz5Pq7fMZLRhP07mSA42uaxL7HzGRasowE8cLsU/edit?usp=sharing",
    },
    "9a105749cfcbac2e07d7640697861f62dfcc7c02bc24519e9c287431bc493f9d": {
        hash: "06a61771d162b6ff107a085da52616b8d34e0ed95c0a1e21d9247f8bcc970141",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1m2R0krMxtVPIyp_YWATO40ysm4LkJJheN9L3U-J-HOs/export?format=csv",
        editPlanSheet: "https://docs.google.com/spreadsheets/d/1b10_23Y5fGQM9gdSUSUQI52uAfs4ezfgdZ_DpbbHGFw/edit?usp=sharing",
    },
};

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-local-dev';

export async function POST({ request, cookies }) {
    // Sjekk at brukeren er admin først
    const token = cookies.get('auth_token');
    
    if (!token) {
        return json({ 
            success: false, 
            error: "Ikke innlogget." 
        }, { status: 401 });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        if (!decoded.isAdmin) {
            return json({ 
                success: false, 
                error: "Ingen tilgang." 
            }, { status: 403 });
        }
        
        const { searchName } = await request.json();
        const nameHash = sha256(searchName.toLowerCase());
        const user = USER_CREDENTIALS[nameHash];
        
        if (!user) {
            return json({ 
                success: false, 
                error: "Finner ingen utøver med det navnet." 
            }, { status: 404 });
        }
        
        return json({ 
            success: true, 
            sheetUrl: user.sheetUrl,
            editPlanSheet: user.editPlanSheet,
            searchName
        });
        
    } catch (error) {
        console.error('Admin search error:', error);
        return json({ 
            success: false, 
            error: "Ugyldig sesjon." 
        }, { status: 401 });
    }
}