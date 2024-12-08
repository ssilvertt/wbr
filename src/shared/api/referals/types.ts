export interface Referal{
    telegram_id: string;
    username: string;
    first_name: string;
}

export interface LastReferals{
    total_count: number;
    items: Referal[];
}