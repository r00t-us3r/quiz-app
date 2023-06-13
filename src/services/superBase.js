import 'react-native-url-polyfill/auto'

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createClient } from "@supabase/supabase-js";
import { globals } from "../globals";

// Better put your these secret keys in .env file
export const superBase = createClient(globals.superBase.url, globals.superBase.key, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});