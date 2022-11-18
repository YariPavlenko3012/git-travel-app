import React, {useEffect, useMemo, useState} from 'react'
import styles from './index.module.scss'

export default function Arrow() {
    const [bonus, setBonus] = useState(null);
    const [target, setTarget] = useState(null);
    const [payouts, setPayouts] = useState(null);

    const bonusPercents = useMemo(() => {
        if (!bonus) {
            return []
        }
        const bonusPercent = bonus.bonus_targets.reduce((accum, bonus) => [...accum, bonus.target_from_percent], []);
        return [...new Set([0, ...bonusPercent])]
    }, [bonus])
    const highBonus = useMemo(() => bonusPercents.length && bonusPercents[bonusPercents.length - 1] + 10, [bonusPercents])

    const getOpacity = (index) => {
        if (index === 0) {
            return 0.25;
        }

        const step = 0.75 / (bonusPercents.length - 1);

        return 0.25 + step * index;
    }

    const getBonus = () => {
        const user_role = "affiliate_manager_senior"
        const kpiData = {
            "id": 1,
            "start_date": "2022-09-01T00:00:00.000000Z",
            "end_date": "2022-09-30T00:00:00.000000Z",
            "type": "monthly",
            "bonuses": [
                {
                    "id": 4,
                    "role": "affiliate_manager_senior",
                    "min_reach_percent": 10,
                    "bonus_targets": [
                        {
                            "id": 1,
                            "partner_status": "fire",
                            "bonus_percent": 1.2,
                            "target_from_percent": 0,
                            "target_to_percent": 65
                        },
                        {
                            "id": 2,
                            "partner_status": "fire",
                            "bonus_percent": 1.8,
                            "target_from_percent": 65,
                            "target_to_percent": 75
                        },
                        {
                            "id": 3,
                            "partner_status": "ice",
                            "bonus_percent": 0.9,
                            "target_from_percent": 65,
                            "target_to_percent": 75
                        },
                        {
                            "id": 4,
                            "partner_status": "fire",
                            "bonus_percent": 2.8,
                            "target_from_percent": 75,
                            "target_to_percent": 95
                        },
                        {
                            "id": 5,
                            "partner_status": "ice",
                            "bonus_percent": 2.4,
                            "target_from_percent": 75,
                            "target_to_percent": 95
                        },
                        {
                            "id": 6,
                            "partner_status": "fire",
                            "bonus_percent": 5.8,
                            "target_from_percent": 95,
                            "target_to_percent": 115
                        },
                        {
                            "id": 7,
                            "partner_status": "ice",
                            "bonus_percent": 4.4,
                            "target_from_percent": 95,
                            "target_to_percent": 115
                        },
                        {
                            "id": 8,
                            "partner_status": "fire",
                            "bonus_percent": 5.8,
                            "target_from_percent": 115,
                            "target_to_percent": null
                        },
                        {
                            "id": 9,
                            "partner_status": "ice",
                            "bonus_percent": 4.4,
                            "target_from_percent": 115,
                            "target_to_percent": null
                        },
                    ],
                    "created_at": "2022-09-26T14:15:24.000000Z"
                },
            ],
            "targets": [
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
                },
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
                }
            ],
            "created_at": "2022-09-26T12:18:51.000000Z"
        }
        // const kpiData = {
        //     "id": 1,
        //     "start_date": "2022-09-01T00:00:00.000000Z",
        //     "end_date": "2022-09-30T00:00:00.000000Z",
        //     "type": "monthly",
        //     "bonuses": [
        //         {
        //             "id": 4,
        //             "role": "affiliate_manager_senior",
        //             "min_reach_percent": 10,
        //             "bonus_targets": [
        //                 {
        //                     "id": 1,
        //                     "partner_status": "fire",
        //                     "bonus_percent": 1.2,
        //                     "target_from_percent": 0,
        //                     "target_to_percent": 65
        //                 },
        //                 {
        //                     "id": 2,
        //                     "partner_status": "fire",
        //                     "bonus_percent": 1.8,
        //                     "target_from_percent": 65,
        //                     "target_to_percent": 75
        //                 },
        //                 {
        //                     "id": 3,
        //                     "partner_status": "ice",
        //                     "bonus_percent": 0.9,
        //                     "target_from_percent": 65,
        //                     "target_to_percent": 75
        //                 },
        //                 {
        //                     "id": 4,
        //                     "partner_status": "fire",
        //                     "bonus_percent": 2.8,
        //                     "target_from_percent": 75,
        //                     "target_to_percent": 95
        //                 },
        //                 {
        //                     "id": 5,
        //                     "partner_status": "ice",
        //                     "bonus_percent": 2.4,
        //                     "target_from_percent": 75,
        //                     "target_to_percent": 95
        //                 },
        //                 {
        //                     "id": 6,
        //                     "partner_status": "fire",
        //                     "bonus_percent": 5.8,
        //                     "target_from_percent": 95,
        //                     "target_to_percent": 115
        //                 },
        //                 {
        //                     "id": 7,
        //                     "partner_status": "ice",
        //                     "bonus_percent": 4.4,
        //                     "target_from_percent": 95,
        //                     "target_to_percent": 115
        //                 },
        //                 {
        //                     "id": 8,
        //                     "partner_status": "fire",
        //                     "bonus_percent": 5.8,
        //                     "target_from_percent": 115,
        //                     "target_to_percent": 130
        //                 },
        //                 {
        //                     "id": 9,
        //                     "partner_status": "ice",
        //                     "bonus_percent": 3.4,
        //                     "target_from_percent": 115,
        //                     "target_to_percent": 130
        //                 },
        //                 {
        //                     "id": 10,
        //                     "partner_status": "fire",
        //                     "bonus_percent": 5.8,
        //                     "target_from_percent": 130,
        //                     "target_to_percent": 170
        //                 },
        //                 {
        //                     "id": 11,
        //                     "partner_status": "ice",
        //                     "bonus_percent": 3.4,
        //                     "target_from_percent": 130,
        //                     "target_to_percent": 170
        //                 },
        //                 {
        //                     "id": 12,
        //                     "partner_status": "fire",
        //                     "bonus_percent": 5.8,
        //                     "target_from_percent": 170,
        //                     "target_to_percent": null
        //                 },
        //                 {
        //                     "id": 13,
        //                     "partner_status": "ice",
        //                     "bonus_percent": 3.4,
        //                     "target_from_percent": 170,
        //                     "target_to_percent": null
        //                 },
        //             ],
        //             "created_at": "2022-09-26T14:15:24.000000Z"
        //         },
        //     ],
        //     "targets": [
        //         {
        //             "id": 3,
        //             "user_id": 3,
        //             "target_revenue": 200,
        //             "actual_revenue": 0,
        //             "actual_revenue_percent": 0,
        //             "actual_bonus": 0,
        //             "created_at": "2022-09-26T14:20:46.000000Z",
        //             "user": {
        //                 "id": 3,
        //                 "manager_id": 27,
        //                 "pretty_name": "#3 - Marjory26@hotmail.com",
        //                 "code_name": "MARJL",
        //                 "ads_token": "UPIVATaZ",
        //                 "email": "Marjory26@hotmail.com",
        //                 "role": "affiliate_manager_junior",
        //                 "status": "pending",
        //                 "balance": 0,
        //                 "blocked_balance": 0,
        //                 "created_at": "2021-10-06T10:50:12.000000Z"
        //             }
        //         },
        //         {
        //             "id": 2,
        //             "user_id": 27,
        //             "target_revenue": 100,
        //             "actual_revenue": 0,
        //             "actual_revenue_percent": 0,
        //             "actual_bonus": 0,
        //             "created_at": "2022-09-26T14:20:46.000000Z",
        //             "user": {
        //                 "id": 27,
        //                 "manager_id": 54,
        //                 "pretty_name": "#27 - Allison.Corkery61@gmail.com",
        //                 "code_name": "ALCOZ",
        //                 "ads_token": "nndacVD2",
        //                 "email": "Allison.Corkery61@gmail.com",
        //                 "role": "affiliate_team_lead",
        //                 "status": "active",
        //                 "balance": 0,
        //                 "blocked_balance": 0,
        //                 "created_at": "2021-10-08T13:52:41.000000Z"
        //             }
        //         },
        //         {
        //             "id": 1,
        //             "user_id": 1,
        //             "target_revenue": 100,
        //             "actual_revenue": 80,
        //             "actual_revenue_percent": 80,
        //             "actual_bonus": 1.75,
        //             "created_at": "2022-09-26T14:20:45.000000Z",
        //             "user": {
        //                 "id": 1,
        //                 "manager_id": 27,
        //                 "pretty_name": "#1 - Mrs. Kelli Hyatt",
        //                 "code_name": "EXAMU",
        //                 "ads_token": "KaewmwCn",
        //                 "email": "Lula.Lemke4@example.com",
        //                 "role": "affiliate_manager_junior",
        //                 "status": "pending",
        //                 "balance": 33479.679999999986,
        //                 "blocked_balance": 800,
        //                 "created_at": "2021-10-05T15:26:48.000000Z"
        //             }
        //         }
        //     ],
        //     "created_at": "2022-09-26T12:18:51.000000Z"
        // }

        const {bonuses} = kpiData
        const bonus = bonuses.find(({role}) => role === user_role)

        setBonus(bonus)
    }
    const getTarget = () => {
        const targetData = {
            "data": [
                {
                    "id": 2,
                    "user_id": 27,
                    "target_revenue": 100,
                    "actual_revenue": 0,
                    "actual_revenue_percent": 115,
                    "actual_bonus": 1950,
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

        setTarget(targetData.data[0])
    }
    const getPayouts = () => {
        const payoutsData = {
            "current_page": 1,
            "data": [
                {
                    "payout": 1200,
                    "bonus_target": {
                        "id": 1,
                        "partner_status": "fire",
                        "bonus_percent": 1.2,
                        "target_from_percent": 0,
                        "target_to_percent": 65
                    }
                },
                {
                    "payout": 150,
                    "bonus_target": {
                        "id": 2,
                        "partner_status": "fire",
                        "bonus_percent": 1.8,
                        "target_from_percent": 65,
                        "target_to_percent": 75
                    }
                },
                {
                    "payout": 50,
                    "bonus_target": {
                        "id": 3,
                        "partner_status": "ice",
                        "bonus_percent": 0.9,
                        "target_from_percent": 65,
                        "target_to_percent": 75
                    }
                },
                {
                    "payout": 150,
                    "bonus_target": {
                        "id": 4,
                        "partner_status": "fire",
                        "bonus_percent": 2.8,
                        "target_from_percent": 75,
                        "target_to_percent": 95
                    }
                },
                {
                    "payout": 150,
                    "bonus_target": {
                        "id": 5,
                        "partner_status": "ice",
                        "bonus_percent": 2.4,
                        "target_from_percent": 75,
                        "target_to_percent": 95
                    }
                },
                {
                    "payout": 300,
                    "bonus_target": {
                        "id": 6,
                        "partner_status": "fire",
                        "bonus_percent": 5.8,
                        "target_from_percent": 95,
                        "target_to_percent": 115
                    }
                },
                {
                    "payout": 0,
                    "bonus_target": {
                        "id": 7,
                        "partner_status": "ice",
                        "bonus_percent": 4.4,
                        "target_from_percent": 95,
                        "target_to_percent": 115
                    }
                },
                {
                    "payout": 300,
                    "bonus_target": {
                        "id": 6,
                        "partner_status": "fire",
                        "bonus_percent": 5.8,
                        "target_from_percent": 115,
                        "target_to_percent": null
                    }
                },
                {
                    "payout": 5,
                    "bonus_target": {
                        "id": 7,
                        "partner_status": "ice",
                        "bonus_percent": 4.4,
                        "target_from_percent": 115,
                        "target_to_percent": null
                    }
                },
            ],
        }
        // const payoutsData = {
        //     "current_page": 1,
        //     "data": [
        //         {
        //            "payout": 1200,
        //             "bonus_target": {
        //                 "id": 1,
        //                "partner_status": "fire",
        //                "bonus_percent": 1.2,
        //                "target_from_percent": 0,
        //                "target_to_percent": 65
        //            }
        //        },
        //        {
        //            "payout": 150,
        //            "bonus_target": {
        //                "id": 2,
        //                 "partner_status": "fire",
        //                "bonus_percent": 1.8,
        //                "target_from_percent": 65,
        //                "target_to_percent": 75
        //            }
        //        },
        //         {
        //            "payout": 50,
        //            "bonus_target": {
        //                "id": 3,
        //                "partner_status": "ice",
        //                "bonus_percent": 0.9,
        //                "target_from_percent": 65,
        //                "target_to_percent": 75
        //            }
        //        },
        //         {
        //             "payout": 150,
        //            "bonus_target": {
        //                 "id": 4,
        //                 "partner_status": "fire",
        //                "bonus_percent": 2.8,
        //                "target_from_percent": 75,
        //                 "target_to_percent": 95
        //             }
        //         },
        //        {
        //             "payout": 150,
        //             "bonus_target": {
        //                "id": 5,
        //                 "partner_status": "ice",
        //                 "bonus_percent": 2.4,
        //                "target_from_percent": 75,
        //                "target_to_percent": 95
        //            }
        //        },
        //         {
        //             "payout": 300,
        //             "bonus_target": {
        //                 "id": 6,
        //                 "partner_status": "fire",
        //                 "bonus_percent": 5.8,
        //                 "target_from_percent": 95,
        //                 "target_to_percent": 115
        //             }
        //         },
        //        {
        //            "payout": 0,
        //            "bonus_target": {
        //                 "id": 7,
        //                 "partner_status": "ice",
        //                 "bonus_percent": 4.4,
        //                 "target_from_percent": 95,
        //                 "target_to_percent": 115
        //             }
        //         },
        //        {
        //             "payout": 0,
        //             "bonus_target": {
        //                 "id": 6,
        //                 "partner_status": "fire",
        //                 "bonus_percent": 5.8,
        //                 "target_from_percent": 95,
        //                 "target_to_percent": 115
        //             }
        //         },
        //         {
        //             "payout": 0,
        //             "bonus_target": {
        //                 "id": 7,
        //                 "partner_status": "ice",
        //                 "bonus_percent": 4.4,
        //                 "target_from_percent": 95,
        //                 "target_to_percent": 115
        //             }
        //         },
        //         {
        //             "payout": 0,
        //             "bonus_target": {
        //                 "id": 8,
        //                 "partner_status": "fire",
        //                 "bonus_percent": 5.8,
        //                 "target_from_percent": 115,
        //                 "target_to_percent": 130
        //             }
        //         },
        //         {
        //             "payout": 0,
        //             "bonus_target": {
        //                 "id": 9,
        //                 "partner_status": "ice",
        //                 "bonus_percent": 3.4,
        //                 "target_from_percent": 115,
        //                 "target_to_percent": 130
        //             }
        //         },
        //         {
        //             "payout": 0,
        //             "bonus_target": {
        //                 "id": 10,
        //                 "partner_status": "fire",
        //                 "bonus_percent": 5.8,
        //                 "target_from_percent": 130,
        //                 "target_to_percent": 170
        //             }
        //         },
        //         {
        //             "payout": 0,
        //             "bonus_target": {
        //                 "id": 11,
        //                 "partner_status": "ice",
        //                 "bonus_percent": 3.4,
        //                 "target_from_percent": 130,
        //                 "target_to_percent": 170
        //             }
        //         },
        //         {
        //             "payout": 0,
        //             "bonus_target": {
        //                 "id": 12,
        //                 "partner_status": "fire",
        //                 "bonus_percent": 5.8,
        //                 "target_from_percent": 170,
        //                 "target_to_percent": null
        //             }
        //         },
        //         {
        //             "payout": 0,
        //             "bonus_target": {
        //                 "id": 13,
        //                 "partner_status": "ice",
        //                 "bonus_percent": 3.4,
        //                 "target_from_percent": 170,
        //                 "target_to_percent": null
        //             }
        //         },
        //     ],
        // }

        setPayouts(payoutsData.data)
    }

    useEffect(() => {
        getBonus()
        getTarget()
        getPayouts()
    }, [])

    if (!bonus || !target || !payouts) {
        return null
    }

    return (
        <div className={styles.arrow}>
            <div className={styles.arrow__top}>
                <svg width="229" height="86" viewBox="0 0 229 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M229 86L114.5 0L0 86H229Z" fill="#ECF4FF"/>
                </svg>
                <div className={styles.arrow__top_content}>
                    <div className={styles.arrow__top_content_price}>
                        ${target.actual_bonus}
                    </div>
                    <div className={styles.arrow__top_content_text}>
                        Your bonus
                    </div>
                </div>
            </div>
            <div className={styles.arrow__additional}/>
            <div className={styles.arrow__block}>
                <div className={styles.arrow__left}>
                    <div className={styles.arrow__left_content}>
                        {bonusPercents.map((percent, index) => {
                            const height = (bonusPercents[index + 1] - bonusPercents[index]) / (highBonus) * 100;
                            let generateStyles = {...(height ? {height: `${height}%`} : {flex: 1})}

                            return (
                                <div className={styles.arrow__left_content_item} style={generateStyles} key={percent}>
                                    <div className={styles.arrow__left_content_text}>
                                        {percent}%
                                    </div>
                                </div>
                            )
                        }).reverse()}
                    </div>
                    <div className={styles.arrow__left_line}>
                        <div className={styles.arrow__left_line_progress}
                             style={{height: `${target.actual_revenue_percent / highBonus * 100}%`}}>
                            <div className={styles.arrow__left_line_progress_hover}>
                                {target.actual_revenue_percent}%
                            </div>
                        </div>
                        <div className={styles.arrow__left_line_star} style={{bottom: `${100 / highBonus * 100}%`}}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.18522 8C6.09016 8 5.99557 7.9695 5.91416 7.90875L4.00005 6.47388L2.08594 7.90875C2.00663 7.96839 1.91133 8.00031 1.81363 7.99996C1.71594 7.99961 1.62085 7.967 1.54194 7.90679C1.46296 7.84692 1.40405 7.76255 1.37359 7.66567C1.34313 7.56879 1.34268 7.46433 1.37229 7.36717L2.08617 4.95882L0.189238 3.56157C0.110623 3.50093 0.0522378 3.41598 0.0223427 3.31874C-0.00755243 3.22151 -0.00744467 3.11691 0.0226508 3.01974C0.0529836 2.92281 0.111692 2.8383 0.190478 2.77814C0.269265 2.71799 0.364144 2.68523 0.461708 2.68451L2.81111 2.68082L3.55911 0.33224C3.58998 0.235489 3.64918 0.151342 3.72834 0.0917137C3.8075 0.0320859 3.9026 0 4.00017 0C4.09774 0 4.19283 0.0320859 4.27199 0.0917137C4.35115 0.151342 4.41035 0.235489 4.44122 0.33224L5.17652 2.68082L7.53792 2.68451C7.6356 2.68509 7.73062 2.71783 7.80949 2.77807C7.88835 2.83832 7.94705 2.92301 7.97724 3.02011C8.00744 3.11722 8.00759 3.2218 7.97768 3.319C7.94777 3.4162 7.88931 3.50108 7.81062 3.56157L5.91369 4.95882L6.62757 7.36717C6.65725 7.46431 6.65685 7.56876 6.62643 7.66564C6.59601 7.76253 6.53713 7.84692 6.45816 7.90679C6.37901 7.96747 6.28338 8.00013 6.18522 8V8Z"
                                    fill="#FFAC33"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={styles.arrow__right}>
                    <div className={styles.arrow__right_content}>
                        {bonusPercents.map((percent, index) => {
                            const height = (bonusPercents[index + 1] - bonusPercents[index]) / (highBonus) * 100;
                            let generateStyles = {
                                ...(height ? {height: `${height}%`} : {flex: 1}),
                                backgroundColor: `rgba(0, 93, 233, ${getOpacity(index)})`,
                                color: getOpacity(index) >= 0.4 ? "white" : "black"
                            }

                            const currentPayouts = payouts.filter(payout => payout.bonus_target.target_from_percent === percent);
                            let payout = currentPayouts.reduce((sum, payout) => {
                                return sum + (payout.payout || 0)
                            }, 0)

                            const targets = bonus.bonus_targets.filter(target => target.target_from_percent === percent);

                            console.log(targets, "targets")

                            return (
                                <div className={styles.arrow__right_content_item} style={generateStyles} key={percent}>
                                    {(!!targets.length && +target.actual_revenue_percent > percent) && (
                                        <div>
                                            ${payout}
                                        </div>
                                    )}
                                    <div className={styles.arrow__right_content_status}>
                                        {targets.map((bonus_target) => (
                                            <div>
                                                {bonus_target.partner_status.slice(0, 1).toUpperCase()} ({bonus_target.bonus_percent}%)
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }).reverse()}
                    </div>
                </div>
            </div>
        </div>
    )
}
