# семинарска по предметот веб програмирање ФИНКИ
#### Изработил: 151227 , Филип Цоњковски 
## Наслов на тема: Продуктивни алатки 

---

Во оваа семинарска разработував CRUD апликација која се базира на TODO листи,финансиски бележник и категории.

---

Упатство за стартување на апликацијата:
- [ локација на frontend-от ](https://github.com/no-ctrl/wp/tree/master/react/app )
- [ локација на backend-от ](https://github.com/no-ctrl/wp/tree/master/wp%20project/src/main/java/mk/ukim/finki/wp/demo)

>backend-от користи postgresql база која е потребно да се пополни,
>рути:  /api/auth/signin и /api/auth/signup  за најава и регистрација на корисник.
>/api/auth/signin по внесено точно корисничко име и лозинка враќа JWT токен кој треба да се праќа во headerot на api повиците за пристап до останатите рути кои се видливи во контролерите.
---
>за да се стартува frontend-от  потребно е да се напише npm start.
> Login компонентата не ми е имплементирана ,
>за да го чува JWT токенот во localStorage или cookie, па потребно е по најава  рачно да се вметне токенот вo fetch методите,во headerот после Bearer token во 
>Category.js ,Bill.js и Todo.js за да се тестираат функционалностите.
