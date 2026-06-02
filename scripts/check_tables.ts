
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProfiles() {
    console.log('Checking for profiles table...');
    const { data, error } = await supabase.from('profiles').select('count(*)').limit(1);

    if (error) {
        console.error('Error checking profiles:', error.message);
        if (error.code === '42P01') {
            console.log('Result: Table "profiles" does NOT exist.');
        } else {
            console.log('Result: Error accessing profiles (RLS or other).');
        }
    } else {
        console.log('Result: Table "profiles" exists.');
    }

    console.log('Checking for users table in public...');
    const { data: usersData, error: usersError } = await supabase.from('users').select('count(*)').limit(1);
    if (usersError) {
        console.error('Error checking users:', usersError.message);
        if (usersError.code === '42P01') {
            console.log('Result: Table "users" does NOT exist in public.');
        }
    } else {
        console.log('Result: Table "users" exists in public.');
    }
}

checkProfiles();
