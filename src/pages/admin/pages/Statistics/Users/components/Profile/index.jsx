import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export default function Profile(){
    const [targets, setTargets] = useState([]);
    const [user, setUser] = useState(null);

    const getLeaderBoard = async () => {
        const data = {
            "data": [
                {
                    "id": 1,
                    "user_id": 1,
                    "target_revenue": 100,
                    "actual_revenue": 80,
                    "actual_revenue_percent": 80,
                    "actual_bonus": 1.75,
                    "created_at": "2022-09-26T14:20:45.000000Z",
                    "user": {
                        "id": 1,
                        "manager_id": 27,
                        "pretty_name": "#1 - Mrs. Kelli Hyatt",
                        "code_name": "EXAMU",
                        "ads_token": "KaewmwCn",
                        "email": "Lula.Lemke4@example.com",
                        "role": "affiliate_manager_junior",
                        "status": "pending",
                        "balance": 33479.679999999986,
                        "blocked_balance": 800,
                        "created_at": "2021-10-05T15:26:48.000000Z"
                    }
                },
                {
                    "id": 3,
                    "user_id": 3,
                    "target_revenue": 200,
                    "actual_revenue": 0,
                    "actual_revenue_percent": 0,
                    "actual_bonus": 0,
                    "created_at": "2022-09-26T14:20:46.000000Z",
                    "user": {
                        "id": 3,
                        "manager_id": 27,
                        "pretty_name": "#3 - Marjory26@hotmail.com",
                        "code_name": "MARJL",
                        "ads_token": "UPIVATaZ",
                        "email": "Marjory26@hotmail.com",
                        "role": "affiliate_manager_junior",
                        "status": "pending",
                        "balance": 0,
                        "blocked_balance": 0,
                        "created_at": "2021-10-06T10:50:12.000000Z"
                    }
                },
                {
                    "id": 2,
                    "user_id": 27,
                    "target_revenue": 100,
                    "actual_revenue": 0,
                    "actual_revenue_percent": 0,
                    "actual_bonus": 0,
                    "created_at": "2022-09-26T14:20:46.000000Z",
                    "user": {
                        "id": 27,
                        "manager_id": 54,
                        "pretty_name": "#27 - Allison.Corkery61@gmail.com",
                        "code_name": "ALCOZ",
                        "ads_token": "nndacVD2",
                        "email": "Allison.Corkery61@gmail.com",
                        "role": "affiliate_team_lead",
                        "status": "active",
                        "balance": 0,
                        "blocked_balance": 0,
                        "created_at": "2021-10-08T13:52:41.000000Z"
                    }
                }
            ],
        }

        setTargets(data.data)
        setUser(data.data[0])
    }

    useEffect(() => {
        getLeaderBoard()
    }, [])

    if(!user){
        return null
    }

    return (
        <div className={styles.profile}>
            <div className={styles.profile__top}>
                <div className={styles.profile__left}>
                    <div className={styles.profile__avatar} />
                </div>
                <div className={styles.profile__right}>
                    <div>
                        <div className={styles.profile__name} >
                            {user.user.pretty_name}
                        </div>
                        <div className={styles.profile__role} >
                            {user.user.role}
                        </div>
                    </div>
                    <div className={styles.profile__target}>
                        Your Target: <span>{user.target_revenue}</span>
                    </div>
                </div>
            </div>
            <div className={styles.profile__reach}>
                <div className={styles.profile__reach_label}>
                    Current Team Reach
                </div>
                <div className={styles.profile__reach_progress}>
                    <div className={styles.profile__reach_progressValue} />
                </div>
            </div>
            <div className={styles.profile__leader}>
                <div className={styles.profile__leader__label}>
                    Leaderboard
                </div>
                <div className={styles.profile__leader__tabel}>
                    <div className={styles.profile__leader__tabel_row}>
                        <div className={styles.profile__leader__tabel_col}>
                            No.
                        </div>
                        <div className={styles.profile__leader__tabel_col}>
                            Manager
                        </div>
                        <div className={styles.profile__leader__tabel_col}>
                            Aff Rev
                        </div>
                        <div className={styles.profile__leader__tabel_col}>
                            %
                        </div>
                    </div>
                    <div className={styles.profile__leader__tabel_oveflow}>
                        {targets.map( (target, index) => (
                            <div className={styles.profile__leader__tabel_row}>
                                <div className={styles.profile__leader__tabel_col}>
                                    <div className={styles.profile__leader__number}>
                                        {index}
                                    </div>
                                </div>
                                <div className={styles.profile__leader__tabel_col}>
                                    <div className={styles.profile__leader__manager}>
                                        <div className={styles.profile__leader__manager_avatar} />
                                        <div className={styles.profile__leader__manager_name} >
                                            {target.user.pretty_name}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.profile__leader__tabel_col}>
                                    {target.actual_revenue}
                                </div>
                                <div className={styles.profile__leader__tabel_col}>
                                    {target.actual_revenue_percent}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.profile__settings}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="#2596FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.3818 14.1818C17.285 14.4012 17.2561 14.6445 17.2989 14.8804C17.3417 15.1164 17.4542 15.3341 17.6218 15.5055L17.6655 15.5491C17.8007 15.6842 17.908 15.8446 17.9812 16.0212C18.0544 16.1978 18.0921 16.387 18.0921 16.5782C18.0921 16.7693 18.0544 16.9586 17.9812 17.1352C17.908 17.3118 17.8007 17.4722 17.6655 17.6073C17.5304 17.7425 17.3699 17.8498 17.1934 17.923C17.0168 17.9962 16.8275 18.0339 16.6364 18.0339C16.4452 18.0339 16.2559 17.9962 16.0794 17.923C15.9028 17.8498 15.7424 17.7425 15.6073 17.6073L15.5636 17.5636C15.3922 17.396 15.1745 17.2835 14.9386 17.2407C14.7027 17.1979 14.4594 17.2268 14.24 17.3236C14.0249 17.4158 13.8414 17.5689 13.7122 17.764C13.583 17.9591 13.5137 18.1878 13.5127 18.4218V18.5455C13.5127 18.9312 13.3595 19.3012 13.0867 19.574C12.8139 19.8468 12.444 20 12.0582 20C11.6724 20 11.3024 19.8468 11.0297 19.574C10.7569 19.3012 10.6036 18.9312 10.6036 18.5455V18.48C10.598 18.2393 10.5201 18.0058 10.38 17.81C10.2399 17.6141 10.0442 17.4649 9.81818 17.3818C9.59882 17.285 9.3555 17.2561 9.11957 17.2989C8.88365 17.3417 8.66595 17.4542 8.49455 17.6218L8.45091 17.6655C8.31582 17.8007 8.1554 17.908 7.97882 17.9812C7.80224 18.0544 7.61297 18.0921 7.42182 18.0921C7.23067 18.0921 7.04139 18.0544 6.86481 17.9812C6.68824 17.908 6.52782 17.8007 6.39273 17.6655C6.25749 17.5304 6.1502 17.3699 6.077 17.1934C6.00381 17.0168 5.96613 16.8275 5.96613 16.6364C5.96613 16.4452 6.00381 16.2559 6.077 16.0794C6.1502 15.9028 6.25749 15.7424 6.39273 15.6073L6.43636 15.5636C6.60403 15.3922 6.7165 15.1745 6.75928 14.9386C6.80205 14.7027 6.77317 14.4594 6.67636 14.24C6.58417 14.0249 6.43109 13.8414 6.23597 13.7122C6.04085 13.583 5.81221 13.5137 5.57818 13.5127H5.45455C5.06878 13.5127 4.69881 13.3595 4.42603 13.0867C4.15325 12.8139 4 12.444 4 12.0582C4 11.6724 4.15325 11.3024 4.42603 11.0297C4.69881 10.7569 5.06878 10.6036 5.45455 10.6036H5.52C5.76072 10.598 5.99419 10.5201 6.19004 10.38C6.38589 10.2399 6.53507 10.0442 6.61818 9.81818C6.71499 9.59882 6.74387 9.3555 6.70109 9.11957C6.65832 8.88365 6.54585 8.66595 6.37818 8.49455L6.33455 8.45091C6.19931 8.31582 6.09202 8.1554 6.01882 7.97882C5.94562 7.80224 5.90795 7.61297 5.90795 7.42182C5.90795 7.23067 5.94562 7.04139 6.01882 6.86481C6.09202 6.68824 6.19931 6.52782 6.33455 6.39273C6.46963 6.25749 6.63005 6.1502 6.80663 6.077C6.98321 6.00381 7.17249 5.96613 7.36364 5.96613C7.55479 5.96613 7.74406 6.00381 7.92064 6.077C8.09722 6.1502 8.25764 6.25749 8.39273 6.39273L8.43636 6.43636C8.60777 6.60403 8.82547 6.7165 9.06139 6.75928C9.29731 6.80205 9.54064 6.77317 9.76 6.67636H9.81818C10.0333 6.58417 10.2167 6.43109 10.346 6.23597C10.4752 6.04085 10.5445 5.81221 10.5455 5.57818V5.45455C10.5455 5.06878 10.6987 4.69881 10.9715 4.42603C11.2443 4.15325 11.6142 4 12 4C12.3858 4 12.7557 4.15325 13.0285 4.42603C13.3013 4.69881 13.4545 5.06878 13.4545 5.45455V5.52C13.4555 5.75403 13.5248 5.98267 13.654 6.17779C13.7833 6.37291 13.9667 6.52599 14.1818 6.61818C14.4012 6.71499 14.6445 6.74387 14.8804 6.70109C15.1164 6.65832 15.3341 6.54585 15.5055 6.37818L15.5491 6.33455C15.6842 6.19931 15.8446 6.09202 16.0212 6.01882C16.1978 5.94562 16.387 5.90795 16.5782 5.90795C16.7693 5.90795 16.9586 5.94562 17.1352 6.01882C17.3118 6.09202 17.4722 6.19931 17.6073 6.33455C17.7425 6.46963 17.8498 6.63005 17.923 6.80663C17.9962 6.98321 18.0339 7.17249 18.0339 7.36364C18.0339 7.55479 17.9962 7.74406 17.923 7.92064C17.8498 8.09722 17.7425 8.25764 17.6073 8.39273L17.5636 8.43636C17.396 8.60777 17.2835 8.82547 17.2407 9.06139C17.1979 9.29731 17.2268 9.54064 17.3236 9.76V9.81818C17.4158 10.0333 17.5689 10.2167 17.764 10.346C17.9591 10.4752 18.1878 10.5445 18.4218 10.5455H18.5455C18.9312 10.5455 19.3012 10.6987 19.574 10.9715C19.8468 11.2443 20 11.6142 20 12C20 12.3858 19.8468 12.7557 19.574 13.0285C19.3012 13.3013 18.9312 13.4545 18.5455 13.4545H18.48C18.246 13.4555 18.0173 13.5248 17.8222 13.654C17.6271 13.7833 17.474 13.9667 17.3818 14.1818V14.1818Z" stroke="#2596FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Set Bonus Scheme and KPI monthly target.
            </div>
        </div>
    )
}
