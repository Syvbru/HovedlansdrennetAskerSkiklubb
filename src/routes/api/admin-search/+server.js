import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const USER_CREDENTIALS = {
    "73c16a202d2b86fcfdc37dd70ff565719156493d9e2c4ef6ea752a4ebea3fb3c": {
        hash: "c9d3b957642e236fd916483d1481ec5522b8b9acd44f6455da891d6721806ee3",
        sheetUrl: "https://docs.google.com/spreadsheets/d/16g9Dj6gGqJdMf4OzF3jfw18bbm7pAaQZSDiszGlH-a0/export?format=csv",
    },
    "a6fc525d7fa299d869b8ab2c88f23a7628a6e8a788b9152066b7b6429049e951": {
        hash: "92f7bd60b336dfe3a254266037f31c6cc146e94140ac462614331e970c3135bc",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1Pi3QHuVMCsAumEnXpiJiEWa6JJpP0mrqFf8RTTyqRdU/export?format=csv",
    },
    "9d486bcfeef9ef6ef45ae8f1d67f63fcb0fec64581a67edbc59b4160b28f52a4": {
        hash: "d909e383f245da1570025ce692d2f50eabc0c316d4a932a3fa5d013b54a0612c",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1rR3Rq28Z4qvz2NmhcQ3rPtxo0vaDkqftuoye49LfOOY/export?format=csv",
    },
    "52f5d96fa7defd7bcc670a4e94584bdcf799aadda0b5fe0fb399d2942290f8cb": {
        hash: "52c3c48ddb9239c32e2863295ae2a346df21062f23edb6a23adbea4742026730",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1hDBeNcskUDIkPvEM-uWixS1ACuEqmDQINR3l4Fn1IXE/export?format=csv",
    },
    "bdb31133df3ef9606d5cd15be403c7d2a3b93ee37954fae4f0c73d8bb390402e": {
        hash: "19f66012993b9e164bfe692ece9b6d38b50b06c173ae3cea2645b65590e38ccb",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1opK9rNmWS9pbADnllMAsXtIB_DuhC_OLHv3EwkBWAk8/export?format=csv",
    },
    "3521ecc80114799253f9c11590417a44fe12e4f7664beea74665fd1d6be1dfbc": {
        hash: "78cb4ae6333525a2da653d975e352243a051a1fcfd21b7b97aeb8582eaa11605",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1RGNvnnCIpdsBiNYd_dYTVWjm1kS2ToP-YISKUGZYaxk/export?format=csv",
    },
    "8fbb21f6c4271e9ebd5f59095b576e30d1859278d2b0b4688c2b89060ee788df": {
        hash: "5a2e47eec0de18abbb9b705a39eaaf2177047db41297a09202ea31889e3c545c",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1X6Xg-Wr11LOsMvbDOg7b8F8LB9CeKWmn5tWlN3fGJLk/export?format=csv",
    },
    "8bbae86e930057698e451b4e7c50411077d0eba4f60d72c6ac93ad4ece44e183": {
        hash: "f4b73b7da041a26825d9d5566b468b1cf2333e55fa0051ab76e05777962cfe33",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1Esgt4ZdoE5f9mYL6OdjYA89jgZLrWso4Kf-fTBxDirU/export?format=csv",
    },
    "99d9d8db45cd4afad1a4995074e31ee38c79b4becc138315d0a4c0777c389978": {
        hash: "bef3523a54f1204786583e293d63b0d2ad8eccf8333ea0b8a87463c07702ec85",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1715BYi3BZqy-qVZdBh3rlC1iRl2ORXpEb5S5zPbiOko/export?format=csv",
    },
    "7f118f9cc2961f740bdd1922031a59a9b9c981aff5a676c85d1a1be7c4ff7ff5": {
        hash: "2ca56d9ee5e758a4c77eaf7884f277a362e3084a331dbee87b8dd1abf8e3ec17",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1_C2dH6nMPxVmXn_x8rg7Ew0ncghdkC2PnHHhAA0jHOs/export?format=csv",
    },
    "66942cd1be80acc6f083e3bc63022d7267b9ae4c2e34e3a667774297a3f21d1d": {
        hash: "6c093fed42ee8dc35b15547694c5b18c2eb578f39a660ff2ce04189889952aa4",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1S52QH21wq0IH-LKUgwZ9PIaRULaUIQADtYXzGzxiuAQ/export?format=csv",
    },
    "412437af1223b40770c9cb7a14f23c7ad8bad1fa9541518ccc830e958e9e6de4": {
        hash: "d4b3ab3fa2f4c9dcb45a3a5ce6586ceae6b33b667843678c5b81ebd834c4225f",
        sheetUrl: "https://docs.google.com/spreadsheets/d/16MiHhFJ-d5wo_aD7-Z2b55-05hWIH5BzeZJQMA134ms/export?format=csv",
    },
    "fbe0c7642bb213eb87a4ef86f38541bda95179173d0290af8b2ec615f11faae4": {
        hash: "072ed2a333645f10eca78200ab476b5d62bee0a82cb82f2a5abae701828598c3",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1tA7eFUyN800TyN1K6gWWqe3TzUO0tTGtHQcWB7TR0io/export?format=csv",
    },
    "44a777ead2a1f80d572dddcc84dbea75cd7c4e4ba08afab53c324a325ca6c17b": {
        hash: "2c9aadacad017c35b9c5395b7e9cf8bcce8d726f2c1cc37f1540f997a72f79f4",
        sheetUrl: "https://docs.google.com/spreadsheets/d/1m2R0krMxtVPIyp_YWATO40ysm4LkJJheN9L3U-J-HOs/export?format=csv",
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
        
        const { nameHash, searchName } = await request.json();
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