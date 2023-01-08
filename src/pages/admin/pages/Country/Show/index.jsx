/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Button, Tabs} from 'antd'
/**
 * components
 */
import CitiesTable from '../../../components/Tables/Cities'
import StatesTable from "../../../components/Tables/States";
import PreviewFilesOriental from '../../../../../components/PreviewFilesOriental';
import SightTable from "../../../components/Tables/Sights";
/**
 * services
 */
import CountryService from "../../../../../services/admin/country.service";
import CityService from "../../../../../services/admin/city.service";
import StateService from "../../../../../services/admin/state.service";
import SightService from "../../../../../services/admin/sight.service";
/**
 * constants
 */
import {
    ADMIN_MAKE_CREATE_STATE_URI,
    ADMIN_MAKE_EDIT_COUNTRY_URI,
    ADMIN_MAKE_EXCURSION_CREATE,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_CURRENCY_URI
} from "../../../../../constants/admin/uri.constant";
/**
 * style
 */
import styles from '../../../styles/show.module.scss'
/**
 * enum
 */
import FileOrientationEnums from '../../../../../enums/FileOrientation'

export default function CountryShow() {
    const [country, setCountry] = useState(null);
    const {countryId} = useParams();

    const getCountry = async () => {
        setCountry(await CountryService.show(countryId))
    };

    const generate = async () => {
        const list = {
            "Автономна республіка крим":
                ["Сімферополь", "Алушта", "Джанкой", "Євпаторія", "Керч", "Cевастополь", "Красноперекопськ", "Саки", "Армянськ", "Феодосія", "Судак", "Ялта", "Алупка", "Бахчисарай", "Білогірськ", "Старий крим", "Щолкіне"],
            "Вінницька область":
                ["Вінниця", "Жмеринка", "Могилів-подільський", "Козятин", "Ладижин", "Хмільник", "Бар", "Бершадь", "Гайсин", "Іллінці", "Калинівка", "Липовець", "Немирів", "Погребище", "Тульчин", "Гнівань", "Шаргород", "Ямпіль"],
            "Волинська область":
                ["Луцьк", "Володимир-волинський", "Ковель", "Нововолинськ", "Устилуг", "Горохів", "Берестечко", "Камінь-каширський", "Ківерці", "Любомль", "Рожище"],
            "Дніпропетровська область":
                ["Дніпро", "Вільногірськ", "Жовті води", "Марганець", "Нікополь", "Новомосковськ", "Покров", "Павлоград", "Першотравенськ", "Синельникове", "Тернівка", "Апостолове", "Зеленодольськ", "Верхньодніпровськ", "Верхівцеве", "Підгородне", "Перещепине", "П'ятихатки"],
            "Донецька область":
                ["Донецьк", "Моспине", "Авдіївка", "Бахмут", "Дебальцеве", "Торецьк", "Залізне", "Мирноград", "Добропілля", "Білицьке", "Білозерське", "Докучаєвськ", "Дружківка", "Єнакієве", "Бунге", "Жданівка", "Хрестівка", "Костянтинівка", "Краматорськ", "Покровськ", "Родинське", "Лиман", "Новогродівка", "Селидове", "Гірник", "Українськ", "Слов'янськ", "Святогірськ", "Сніжне", "Чистякове", "Вугледар", "Харцизьк", "Зугрес", "Іловайськ", "Шахтарськ", "Ясинувата", "Амвросіївка", "Вуглегірськ", "Сіверськ", "Світлодарськ", "Соледар", "Часів яр", "Волноваха", "Мар'їнка", "Красногорівка", "Курахове", "Новоазовськ", "Миколаївка", "Кальміуське"],
            "Житомирська область":
                ["Житомир", "Бердичів", "Коростень", "Малин", "Новоград-волинський", "Андрушівка", "Баранівка", "Коростишів", "Овруч", "Олевськ", "Радомишль", "Чуднів"],
            "Закарпатська область":
                ["Ужгород", "Берегове", "Мукачево", "Хуст", "Чоп", "Виноградів", "Іршава", "Перечин", "Рахів", "Свалява", "Тячів"],
            "Запорізька область":
                ["Запоріжжя", "Бердянськ", "Мелітополь", "Токмак", "Енергодар", "Василівка", "Дніпрорудне", "Вільнянськ", "Гуляйполе", "Кам'янка-дніпровська", "Оріхів", "Пологи", "Приморськ", "Молочанськ"],
            "Івано-Франківська область":
                ["Івано-Франківськ", "Болехів", "Бурштин", "Калуш", "Коломия", "Яремче", "Галич", "Городенка", "Долина", "Косів", "Надвірна", "Рогатин", "Снятин", "Тлумач", "Тисмениця"],
            "Київська область":
                ["Київ", "Біла церква", "Березань", "Бориспіль", "Бровари", "Васильків", "Буча", "Ірпінь", "Переяслав", "Прип'ять", "Фастів", "Ржищів", "Славутич", "Обухів", "Узин", "Богуслав", "Вишгород", "Чорнобиль", "Кагарлик", "Боярка", "Вишневе", "Миронівка", "Українка", "Сквира", "Тараща", "Тетіїв", "Яготин"],
            "Кіровоградська область":
                ["Кропівницький", "Олександрія", "Знам'янка", "Світловодськ", "Бобринець", "Гайворон", "Помічна", "Долинська", "Мала виска", "Новомиргород", "Новоукраїнка", "Благовіщенське"],
            "Луганська область":
                ["Луганськ", "Олександрівськ", "Антрацит", "Брянка", "Голубівка", "Алчевськ", "Сорокине", "Молодогвардійськ", "Суходільськ", "Хрустальний", "Боково-хрустальне", "Міусинськ", "Петрово-красносілля", "Лисичанськ", "Новодружеськ", "Привілля", "Первомайськ", "Ровеньки", "Рубіжне", "Довжанськ", "Вознесенівка", "Сєвєродонецьк", "Кадіївка", "Алмазна", "Ірміно", "Кремінна", "Лутугине", "Щастя", "Перевальськ", "Кипуче", "Зоринськ", "Попасна", "Гірське", "Золоте", "Сватове", "Зимогір'я", "Старобільськ"],
            "Львівська область":
                ["Львів", "Винники", "Борислав", "Дрогобич", "Стебник", "Моршин", "Новий розділ", "Самбір", "Стрий", "Трускавець", "Червоноград", "Броди", "Буськ", "Городок", "Комарно", "Жидачів", "Ходорів", "Золочів", "Глиняни", "Кам'янка-бузька", "Мостиська", "Судова вишня", "Жовква", "Дубляни", "Рава-руська", "Миколаїв", "Перемишляни", "Бібрка", "Пустомити", "Радехів", "Новий калинів", "Рудки", "Сколе", "Сокаль", "Соснівка", "Белз", "Великі мости", "Угнів", "Старий самбір", "Добромиль", "Хирів", "Турка", "Яворів", "Новояворівськ"],
            "Миколаївська область":
                ["Миколаїв", "Вознесенськ", "Очаків", "Первомайськ", "Южноукраїнськ", "Баштанка", "Новий буг", "Нова одеса", "Снігурівка"],
            "Одеська область":
                ["Одеса", "Балта", "Білгород-дністровський", "Біляївка", "Ізмаїл", "Чорноморськ", "Подільськ", "Теплодар", "Южне", "Ананьїв", "Арциз", "Березівка", "Болград", "Кілія", "Вилкове", "Кодима", "Роздільна", "Рені", "Татарбунари"],
            "Полтавська область":
                ["Полтава", "Горішні плавні", "Гадяч", "Лубни", "Миргород", "Глобине", "Гребінка", "Зіньків", "Карлівка", "Кобеляки", "Лохвиця", "Заводське", "Пирятин", "Решетилівка", "Хорол"],
            "Рівненська область":
                ["Рівне", "Дубно", "Вараш", "Острог", "Березне", "Дубровиця", "Здолбунів", "Корець", "Костопіль", "Сарни", "Радивилів"],
            "Сумська область":
                ["Суми", "Охтирка", "Глухів", "Конотоп", "Лебедин", "Ромни", "Шостка", "Білопілля", "Ворожба", "Буринь", "Кролевець", "Путивль", "Середина-буда", "Тростянець", "Дружба"],
            "Тернопільська область":
                ["Тернопіль", "Чортків", "Бережани", "Кременець", "Борщів", "Бучач", "Копичинці", "Хоростків", "Заліщики", "Збараж", "Зборів", "Почаїв", "Ланівці", "Монастириська", "Скалат", "Підгайці", "Теребовля", "Шумськ"],
            "Харківська область":
                ["Харків", "Ізюм", "Куп'янськ", "Лозова", "Люботин", "Первомайський", "Чугуїв", "Балаклія", "Барвінкове", "Богодухів", "Валки", "Вовчанськ", "Зміїв", "Дергачі", "Красноград", "Мерефа", "Південне"],
            "Херсонська область":
                ["Херсон", "Гола пристань", "Каховка", "Нова каховка", "Таврійськ", "Берислав", "Генічеськ", "Скадовськ", "Олешки"],
            "Хмельницька область":
                ["Хмельницький", "Кам'янець-подільський", "Нетішин", "Славута", "Шепетівка", "Старокостянтинів", "Волочиськ", "Городок", "Деражня", "Дунаївці", "Ізяслав", "Красилів", "Полонне"],
            "Черкаська область":
                ["Черкаси", "Ватутіне", "Канів", "Золотоноша", "Сміла", "Умань", "Городище", "Жашків", "Звенигородка", "Кам'янка", "Корсунь-шевченківський", "Монастирище", "Тальне", "Христинівка", "Чигирин", "Шпола"],
            "Чернівецька область":
                ["Чернівці", "Новодністровськ", "Вижниця", "Вашківці", "Герца", "Заставна", "Кіцмань", "Новоселиця", "Сокиряни", "Сторожинець", "Хотин"],
            "Чернігівська область":
                ["Чернігів", "Ніжин", "Новгород-сіверський", "Прилуки", "Бахмач", "Батурин", "Бобровиця", "Борзна", "Городня", "Ічня", "Остер", "Корюківка", "Мена", "Носівка", "Семенівка", "Сновськ"]
        }
        const states = Object.keys(list)

        for (let i = 0; i < states.length; i++) {
            const state = states[i];
            console.log(state, "STATE")

            const {id: stateId} = await StateService.create({
                country_id: 1,
                state_name: state
            })

            for (let j = 0; j < list[state].length; j++){
                const city = list[state][j];
                const {id: cityId} = await CityService.create({
                    city: {
                        city_description: "TEST",
                        city_name: city,
                        state_id: stateId
                    }
                })

                console.log(`ID: ${cityId}. City: ${city}; ID_STAT: ${stateId}. STATE ${state}`)
            }
        }
    }

    useEffect(() => {
        getCountry();
    }, []);

    if (!country) {
        return <div>Loader...</div>
    }

    return (
        <div>
            <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                <div>
                    {country.name}
                </div>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <Link to={ADMIN_MAKE_EXCURSION_CREATE(countryId)}>
                        <Button type="primary" className={styles.show__btn}>
                            Create Excursions
                        </Button>
                    </Link>
                    <Link to={ADMIN_MAKE_EDIT_COUNTRY_URI(countryId)}>
                        <Button type="primary" className={styles.show__btn}>
                            Edit Country
                        </Button>
                    </Link>
                </div>
            </h3>
            <div className={styles.show}>
                <div className={styles.show__wrapper}>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          ID:
                      </span> {country.id}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country name:
                      </span>
                        <span style={{color: country?.name ? "black" : "red"}}>
                          {country.name || "No name"}
                      </span>
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country code:
                      </span> {country.country_code_in_iso_3166_1_format}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Capital:
                      </span>
                        {country.capital &&
                            <Link to={ADMIN_MAKE_SHOW_CITY_URI(country.capital.id)}
                                  style={{color: country.capital.name ? "#0d6efd" : "red"}}>
                                {country.capital.name || "No name"}
                            </Link>
                        }
                        {!country.capital &&
                            <span style={{color: "red"}}>
                            N/A
                        </span>
                        }
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Currency:
                      </span>
                        <Link to={ADMIN_MAKE_SHOW_CURRENCY_URI(country.currency.id)}>
                            {country.currency.currency_code}
                        </Link>
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Official language:
                      </span>
                        <Link to={ADMIN_MAKE_SHOW_CURRENCY_URI(country.official_language.id)}>
                            {country.official_language.name}
                        </Link>
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Population:
                      </span>
                        {country.population}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country area:
                      </span>
                        {country.country_area}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Safety index:
                      </span>
                        {country.safety_index}
                    </p>
                    <p className={styles.show__item}>
                     <span className={styles.show__item_key}>
                          Happiness rating:
                     </span>
                        {country.happiness_rating}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Has seas:
                      </span>
                        {country.has_seas ? "Yes" : "No"}
                    </p>
                    <p className={styles.show__item}>
                     <span className={styles.show__item_key}>
                          Has mountains:
                     </span>
                        {country.has_mountains ? "Yes" : "No"}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Highest point:
                      </span>
                        {country.highest_point}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Emergency number:
                      </span> {country.ambulance_number}
                    </p>
                </div>
                <div style={{display: "flex", gap: 10, marginBottom: 10}}>
                    <PreviewFilesOriental oriental={FileOrientationEnums.landscape} image={country.landscape_image?.path} height={100}/>
                    <PreviewFilesOriental oriental={FileOrientationEnums.portrait} image={country.portrait_image?.path} height={100}/>
                </div>
            </div>

            <Tabs type="card">
                <Tabs.TabPane tab="State" key="1">
                    <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                        State of {country.name}
                        <Link to={ADMIN_MAKE_CREATE_STATE_URI(countryId)}>
                            <Button type="primary" className={styles.show__btn}>
                                Create state
                            </Button>
                        </Link>
                    </h3>
                    <StatesTable searchParams={{country_id: countryId}}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="City" key="2">
                    <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                        City of {country.name}
                    </h3>
                    <CitiesTable searchParams={{country_id: countryId}}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Sight" key="3">
                    <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                        Sights of {country.name}
                    </h3>
                    <SightTable searchParams={{country_id: countryId}}/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
