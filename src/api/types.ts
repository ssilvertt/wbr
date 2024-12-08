export interface UserEntity {
    created_at: string;
    telegram_id: string;
    username: string;
    first_name: string;
    last_name: string;
    referer_id: string;
    language_code: string;
    is_premium: boolean;
}

export interface AuthResponse {
    access_token: string;
    user_entity: UserEntity;
}