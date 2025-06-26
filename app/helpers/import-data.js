const importedDiscipline = {
  fullName: "Объектно-ориентированное программирование",
  code: "Б1.О.13",
  studyField: "Информатика и вычислительная техника",
  studyFieldCode: "09.03.01",
  profileName: "Системы искусственного интеллекта",
};

const importTopics = (disciplineId) => [
  {
    disciplineId: disciplineId,
    topicName:
      "Основные понятия объектно-ориентированного программирования. Классы и объекты.",
  },
  {
    disciplineId: disciplineId,
    topicName:
      "Абстракция и модульность в ООП. Интерфейсы и абстрактные классы.",
  },
  // {
  //     disciplineId: disciplineId,
  //     topicName: 'Концептуальное проектирование, реализация, оценка работы и поддержка базы данных.',
  // }, {
  //     disciplineId: disciplineId,
  //     topicName: 'Безопасность баз данных.',
  // }
];

const importLections = (topicIds) => {
  const [firstTopicId, secondTopicId, thirdTopicId, fourthTopicId] = topicIds;

  return [
    // Тема 1
    {
      topicId: firstTopicId,
      lectionName:
        "Введение в объектно-ориентированное программирование: история, цели, преимущества",
    },
    {
      topicId: firstTopicId,
      lectionName: "Объявление и использование классов в C++",
    },
    // Тема 2
    {
      topicId: secondTopicId,
      lectionName:
        "Принцип абстракции в объектно-ориентированном программировании",
    },
    {
      topicId: secondTopicId,
      lectionName:
        "Проектирование иерархий классов с использованием абстракции",
    },
    // // Тема 3
    // {
    //     topicId: thirdTopicId,
    //     lectionName: 'Планирование, осуществимость, определение требований (техническое задание (ТЗ))',
    // },
    // {
    //     topicId: thirdTopicId,
    //     lectionName: 'Построение логической модели',
    // },
    // {
    //     topicId: thirdTopicId,
    //     lectionName: 'Алгоритм перехода от диаграммы «сущность-связь» к логической модели предметной области',
    // },
    // {
    //     topicId: thirdTopicId,
    //     lectionName: 'Нормализация отношений реляционной базы данных',
    // },
    // {
    //     topicId: thirdTopicId,
    //     lectionName: 'Нормальные формы: 1НФ, 2НФ, 3НФ, НФБК и другие',
    // },
    // // Тема 4
    // {
    //     topicId: fourthTopicId,
    //     lectionName: 'Основные типы угроз, компьютерные средства контроля: авторизация пользователей, представления (подсхемы), резервное копирование и восстановление, поддержка целостности, шифрование',
    // },
    // {
    //     topicId: fourthTopicId,
    //     lectionName: 'Тенденции развития баз данных',
    // },
    // {
    //     topicId: fourthTopicId,
    //     lectionName: 'Тенденции развития систем управления базами данных',
    // },
    // {
    //     topicId: fourthTopicId,
    //     lectionName: 'Web-технологии и системы управления базами данными',
    // },
  ];
};

const importLaboratoryClasses = (topicIds) => {
  const [firstTopicId, secondTopicId, thirdTopicId, fourthTopicId] = topicIds;

  return [
    // Тема 1
    {
      topicId: firstTopicId,
      laboratoryClassName: "Создание класса и объекта в C++",
    },
    {
      topicId: firstTopicId,
      laboratoryClassName: "Конструкторы, деструкторы, перегрузка методов",
    },
    // Тема 2
    {
      topicId: secondTopicId,
      laboratoryClassName: "Абстрактные классы и виртуальные функции",
    },
    {
      topicId: secondTopicId,
      laboratoryClassName: "Полиморфизм и динамическое связывание",
    },
    // // Тема 3
    // {
    //     topicId: thirdTopicId,
    //     laboratoryClassName: 'Проектирование реляционных баз данных',
    // },
    // {
    //     topicId: thirdTopicId,
    //     laboratoryClassName: 'Нормализация отношений',
    // },
    // // Тема 4
    // {
    //     topicId: fourthTopicId,
    //     laboratoryClassName: 'Организации архитектуры «клиент-сервер» в системах баз данных',
    // },
    // {
    //     topicId: fourthTopicId,
    //     laboratoryClassName: 'Построение полной атрибутивной модель базы данных в нотации IDEF1X',
    // },
    // {
    //     topicId: fourthTopicId,
    //     laboratoryClassName: 'Создание программного приложения для работы с базой данных',
    // },
  ];
};

const importPracticalClasses = (topicIds) => {
  const [firstTopicId, secondTopicId, thirdTopicId, fourthTopicId] = topicIds;

  return [
    // Тема 1
    {
      topicId: firstTopicId,
      practicalClassName: "Работа с полями и методами класса",
    },
    {
      topicId: firstTopicId,
      practicalClassName: "Использование массива объектов",
    },
    // Тема 2
    {
      topicId: secondTopicId,
      practicalClassName:
        "Принцип 'программируй на интерфейсах, а не на реализациях'",
    },
    {
      topicId: secondTopicId,
      practicalClassName: "Декомпозиция кода и модульность",
    },
    // // Тема 3
    // {
    //     topicId: thirdTopicId,
    //     practicalClassName: 'Нормализация отношений',
    // },
    // {
    //     topicId: thirdTopicId,
    //     practicalClassName: 'Проектирование БД для различных предметных областей',
    // },
    // // Тема 4
    // {
    //     topicId: fourthTopicId,
    //     practicalClassName: 'Написание запросов на SQL для разработанных структур БД',
    // }
  ];
};

const importExamQuestions = (disciplineId, topicIds) => {
  const [firstTopicId, secondTopicId, thirdTopicId, fourthTopicId] = topicIds;

  return [
    // Тема 1
    {
      topicId: firstTopicId,
      disciplineId: disciplineId,
      examQuestionName:
        "Дайте определение объектно-ориентированного программирования. В чем его преимущества перед процедурным подходом?",
    },
    {
      topicId: firstTopicId,
      disciplineId: disciplineId,
      examQuestionName: "Что такое класс и объект",
    },
    {
      topicId: firstTopicId,
      disciplineId: disciplineId,
      examQuestionName: "Какие виды членов класса вы знаете",
    },
    // Тема 2
    {
      topicId: secondTopicId,
      disciplineId: disciplineId,
      examQuestionName: "Что такое абстракция в ООП",
    },
    {
      topicId: secondTopicId,
      disciplineId: disciplineId,
      examQuestionName: "Как реализуется модульность в C++",
    },
    {
      topicId: secondTopicId,
      disciplineId: disciplineId,
      examQuestionName:
        "Какие ошибки могут возникнуть при работе с абстрактными классами",
    },
    // // Тема 3
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Этапы проектирования баз данных',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Инфологическое проектирование',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Задачи, решаемые на этапе инфологического проектирования',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Задачи, решаемые на этапе логического проектирования',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Задачи, решаемые на этапе физического проектирования',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Отличие понятия типа сущности и элемента сущности',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Для чего предназначена диаграмма «сущность-связь»',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Как представляется диаграмма «сущность-связь» в нотации П. Чена',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Какие существуют типы связей между сущностей и чем они отличаются',
    // },
    // {
    //     topicId: thirdTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Какова цель модель, основанная на ключах',
    // },
    // // Тема 4
    // {
    //     topicId: fourthTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Схемы и подсхемы как способ описания логической структуры данных',
    // },
    // {
    //     topicId: fourthTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Типы связей между элементами данных',
    // },
    // {
    //     topicId: fourthTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Способы представления исходной информации: ЕR-диаграммы, диаграммы Бахмана, овал - диаграммы',
    // },
    // {
    //     topicId: fourthTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Определения сетевой и древовидной структур данных',
    // },
    // {
    //     topicId: fourthTopicId,
    //     disciplineId: disciplineId,
    //     examQuestionName: 'Преобразование сложной сетевой структуры в древовидную структуру данных. Цель преобразования',
    // },
  ];
};

const importCompetences = (disciplineId) => [
  {
    disciplineId: disciplineId,
    competenceType: "Общепрофессиональные компетенции",
    competenceCode: "ОПК-2",
    competenceName:
      "Способен понимать принципы работы современных информационных технологий и программных средств, в том числе отечественного производства, и использовать их при решении задач профессиональной деятельности",
    indicatorCode: "ОПК-2.1. Знать:",
    indicatorName:
      "современные информационно-коммуникационные и интеллектуальные технологии, инструментальные среды, программно-технические платформы для решения профессиональных задач.",
  },
  {
    disciplineId: disciplineId,
    competenceType: "профессиональный",
    competenceCode: "ПК-8",
    competenceName:
      "Способен осуществлять ведение баз данных в информационных системах, обеспечивать их безопасность и целостность",
    indicatorCode: "ПК-8.1. Знать:",
    indicatorName:
      "методы реляционной алгебры и языки программирования, ориентированными на обработку данных для построения, сопровождения и модификации баз данных",
  },
];

const importPurposes = (disciplineId) => [
  {
    disciplineId: disciplineId,
    purposeName:
      "дать представление о современных принципах объектно-ориентированного программирования",
  },
  {
    disciplineId: disciplineId,
    purposeName:
      "научить проектировать и реализовывать программные компоненты на языке C++",
  },
  {
    disciplineId: disciplineId,
    purposeName:
      "использовать классы, интерфейсы и абстракции для создания масштабируемых и модульных программ",
  },
];

const importObjectives = (disciplineId) => [
  {
    disciplineId: disciplineId,
    objectiveName:
      "формирование у студентов представления о роли и преимуществах объектно-ориентированного подхода в разработке программного обеспечения",
  },
  {
    disciplineId: disciplineId,
    objectiveName:
      "ознакомление студентов с основными принципами ООП: инкапсуляцией, наследованием, полиморфизмом и абстракцией",
  },
  {
    disciplineId: disciplineId,
    objectiveName:
      "освоение практических навыков разработки объектно-ориентированных программ на языке C++",
  },
];

module.exports = {
  importedDiscipline,
  importTopics,
  importLections,
  importLaboratoryClasses,
  importPracticalClasses,
  importExamQuestions,
  importCompetences,
  importPurposes,
  importObjectives,
};

// export const importedData = {
//     discipline: discipline,
//     topics: topics,
//     lections: lections,
//     laboratoryClasses: laboratoryClasses,
//     practicalClasses: practicalClasses,
//     examQuestions: examQuestions,
//     competences: competences,
// }
