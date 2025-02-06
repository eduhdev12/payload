import type { DefaultTranslationsObject, Language } from '../types.js'

export const hrTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'Račun',
    accountOfCurrentUser: 'Račun trenutnog korisnika',
    accountVerified: 'Račun je uspješno verificiran.',
    alreadyActivated: 'Već aktivirano',
    alreadyLoggedIn: 'Već prijavljeni',
    apiKey: 'API ključ',
    authenticated: 'Autenticiran',
    backToLogin: 'Natrag na prijavu',
    beginCreateFirstUser: 'Za početak, izradite prvog korisnika.',
    changePassword: 'Promijeni lozinku',
    checkYourEmailForPasswordReset:
      'Ako je e-mail adresa povezana s računom, uskoro ćete primiti upute za resetiranje lozinke. Molimo provjerite svoju mapu za neželjenu poštu ili spam ako ne vidite e-mail u svojoj pristigloj pošti.',
    confirmGeneration: 'Potvrdi generiranje',
    confirmPassword: 'Potvrdi lozinku',
    createFirstUser: 'Izradi prvog korisnika',
    emailNotValid: 'E-mail nije ispravan',
    emailOrUsername: 'E-mail ili korisničko ime',
    emailSent: 'E-mail poslan',
    emailVerified: 'E-mail uspješno verificiran.',
    enableAPIKey: 'Omogući API ključ',
    failedToUnlock: 'Otključavanje nije uspjelo.',
    forceUnlock: 'Prisilno otključaj',
    forgotPassword: 'Zaboravljena lozinka',
    forgotPasswordEmailInstructions:
      'Molimo unesite svoju e-mail adresu. Primit ćete poruku s uputama za ponovno postavljanje lozinke.',
    forgotPasswordQuestion: 'Zaboravljena lozinka?',
    forgotPasswordUsernameInstructions:
      'Molimo unesite vaše korisničko ime ispod. Upute o tome kako resetirati vašu lozinku bit će poslane na e-adresu povezanu s vašim korisničkim imenom.',
    generate: 'Generiraj',
    generateNewAPIKey: 'Generiraj novi API ključ',
    generatingNewAPIKeyWillInvalidate:
      'Generiranje novog API ključa će <1>poništiti</1> prethodni ključ. Jeste li sigurni da želite nastaviti?',
    lockUntil: 'Zaključaj dok',
    logBackIn: 'Ponovno se prijavite',
    loggedIn: 'Za prijavu s drugim korisničkim računom potrebno je prvo <0>odjaviti se</0>',
    loggedInChangePassword:
      'Da biste promijenili lozinku, otvorite svoj <0>račun</0> i promijenite je tamo.',
    loggedOutInactivity: 'Odjavljeni ste zbog neaktivnosti.',
    loggedOutSuccessfully: 'Uspješno ste odjavljeni.',
    loggingOut: 'Odjava u tijeku...',
    login: 'Prijava',
    loginAttempts: 'Pokušaji prijave',
    loginUser: 'Prijava korisnika',
    loginWithAnotherUser:
      'Za prijavu s drugim korisničkim računom potrebno je prvo <0>odjaviti se</0>',
    logOut: 'Odjava',
    logout: 'Odjava',
    logoutSuccessful: 'Odjava uspješna.',
    logoutUser: 'Odjava korisnika',
    newAccountCreated:
      'Novi račun je izrađen. Pristupite računu klikom na: <a href="{{serverURL}}">{{serverURL}}</a>. Molimo kliknite na sljedeću poveznicu ili zalijepite URL, koji se nalazi ispod, u preglednik da biste potvrdili svoju e-mail adresu: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Nakon što potvrdite e-mail adresu, moći ćete se prijaviti.',
    newAPIKeyGenerated: 'New API ključ generiran.',
    newPassword: 'Nova lozinka',
    passed: 'Autentifikacija je prošla',
    passwordResetSuccessfully: 'Lozinka uspješno resetirana.',
    resetPassword: 'Resetiranje lozinke',
    resetPasswordExpiration: 'Rok trajanja resetiranja lozinke',
    resetPasswordToken: 'Resetiranje tokena lozinke',
    resetYourPassword: 'Resetirajte svoju lozinku',
    stayLoggedIn: 'Ostanite prijavljeni',
    successfullyRegisteredFirstUser: 'Uspješno registriran prvi korisnik.',
    successfullyUnlocked: 'Uspješno otključano',
    tokenRefreshSuccessful: 'Osvježavanje tokena uspješno.',
    unableToVerify: 'Nije moguće potvrditi',
    username: 'Korisničko ime',
    usernameNotValid: 'Uneseno korisničko ime nije valjano.',
    verified: 'Potvrđeno',
    verifiedSuccessfully: 'Uspješno potvrđeno',
    verify: 'Potvrdi',
    verifyUser: 'Potvrdi korisnika',
    verifyYourEmail: 'Potvrdi svoju e-mail adresu',
    youAreInactive:
      'Neaktivni ste već neko vrijeme i uskoro ćete biti automatski odjavljeni zbog vlastite sigurnosti. Želite li ostati prijavljeni?',
    youAreReceivingResetPassword:
      'Primili ste ovo jer ste Vi (ili netko drugi) zatražili promjenu lozinke za Vaš račun. Molimo kliknite na poveznicu ili zalijepite ovo u svoje preglednik da biste završili proces:',
    youDidNotRequestPassword:
      'Ako niste zatražili ovo, molimo ignorirajte ovaj e-mail i Vaša će lozinka ostati nepromijenjena.',
  },
  error: {
    accountAlreadyActivated: 'Ovaj račun je već aktiviran.',
    autosaving: 'Nastao je problem pri automatskom spremanju ovog dokumenta.',
    correctInvalidFields: 'Molimo ispravite neispravna polja.',
    deletingFile: 'Dogodila se pogreška pri brisanju datoteke.',
    deletingTitle:
      'Dogodila se pogreška pri brisanju {{title}}. Molimo provjerite svoju internet vezu i pokušajte ponovno.',
    emailOrPasswordIncorrect: 'E-mail adresa ili lozinka netočni.',
    followingFieldsInvalid_one: 'Ovo polje je neispravno:',
    followingFieldsInvalid_other: 'Ova polja su neispravna:',
    incorrectCollection: 'Neispravna kolekcija',
    invalidFileType: 'Neispravan tip datoteke',
    invalidFileTypeValue: 'Neispravan tip datoteke: {{value}}',
    invalidRequestArgs: 'Nevažeći argumenti u zahtjevu: {{args}}',
    loadingDocument: 'Došlo je do problema pri učitavanju dokumenta čiji je ID {{id}}.',
    localesNotSaved_one: 'Sljedeću lokalnu postavku nije bilo moguće spremiti:',
    localesNotSaved_other: 'Sljedeće lokalne postavke nije bilo moguće spremiti:',
    logoutFailed: 'Odjava nije uspjela.',
    missingEmail: 'Nedostaje e-mail.',
    missingIDOfDocument: 'Nedostaje ID dokumenta da bi se ažurirao.',
    missingIDOfVersion: 'Nedostaje ID verzije.',
    missingRequiredData: 'Nedostaju obvezni podaci.',
    noFilesUploaded: 'Nijedna datoteka nije učitana.',
    noMatchedField: 'Nema podudarajućih polja za "{{label}}"',
    notAllowedToAccessPage: 'Nemate dopuštenje pristupiti ovoj stranici.',
    notAllowedToPerformAction: 'Nemate dopuštenje izvršiti ovu radnju.',
    notFound: 'Traženi resurs nije pronađen.',
    noUser: 'Nema korisnika',
    previewing: 'Došlo je do problema pri pregledavanju ovog dokumenta.',
    problemUploadingFile: 'Došlo je do problema pri učitavanju datoteke.',
    tokenInvalidOrExpired: 'Token je neispravan ili je istekao.',
    tokenNotProvided: 'Token nije pružen.',
    unableToDeleteCount: 'Nije moguće izbrisati {{count}} od {{total}} {{label}}.',
    unableToReindexCollection:
      'Pogreška pri ponovnom indeksiranju kolekcije {{collection}}. Operacija je prekinuta.',
    unableToUpdateCount: 'Nije moguće ažurirati {{count}} od {{total}} {{label}}.',
    unauthorized: 'Neovlašteno, morate biti prijavljeni da biste uputili ovaj zahtjev.',
    unauthorizedAdmin: 'Neovlašteno, ovaj korisnik nema pristup administratorskom panelu.',
    unknown: 'Došlo je do nepoznate pogreške.',
    unPublishingDocument: 'Došlo je do problema pri poništavanju objave ovog dokumenta.',
    unspecific: 'Došlo je do pogreške.',
    userEmailAlreadyRegistered: 'Korisnik s navedenom e-mail adresom je već registriran.',
    userLocked: 'Ovaj korisnik je zaključan zbog previše neuspješnih pokušaja prijave.',
    usernameAlreadyRegistered: 'Korisnik s navedenim korisničkim imenom već je registriran.',
    usernameOrPasswordIncorrect: 'Korisničko ime ili lozinka koju ste unijeli su netočni.',
    valueMustBeUnique: 'Vrijednost mora biti jedinstvena.',
    verificationTokenInvalid: 'Verifikacijski token je neispravan.',
  },
  fields: {
    addLabel: 'Dodaj {{label}}',
    addLink: 'Dodaj poveznicu',
    addNew: 'Dodaj novi',
    addNewLabel: 'Dodaj novi {{label}}',
    addRelationship: 'Dodaj odnos',
    addUpload: 'Dodaj učitavanje',
    block: 'blokiranje',
    blocks: 'blokiranja',
    blockType: 'Vrsta blokiranja',
    chooseBetweenCustomTextOrDocument:
      'Izaberite između unošenja prilagođenog teksta URL ili poveznice na drugi dokument.',
    chooseDocumentToLink: 'Odaberite dokument koji želite povezati.',
    chooseFromExisting: 'Odaberite iz postojećih.',
    chooseLabel: 'Odaberite {{label}}',
    collapseAll: 'Sažmi sve',
    customURL: 'Prilagođeni URL',
    editLabelData: 'Uredi {{label}} podatke',
    editLink: 'Uredi poveznicu',
    editRelationship: 'Uredi odnos',
    enterURL: 'Unesi URL',
    internalLink: 'Interna poveznika',
    itemsAndMore: '{{items}} i {{count}} više',
    labelRelationship: '{{label}} veza',
    latitude: 'Zemljopisna širina',
    linkedTo: 'Povezan s <0>{{label}}</0>',
    linkType: 'Tip poveznce',
    longitude: 'Zemljopisna dužina',
    newLabel: 'Novo {{label}}',
    openInNewTab: 'Otvori u novoj kartici.',
    passwordsDoNotMatch: 'Lozinke nisu iste.',
    relatedDocument: 'Povezani dokument',
    relationTo: 'Veza sa',
    removeRelationship: 'Ukloni vezu',
    removeUpload: 'Ukloni prijenos',
    saveChanges: 'Spremi promjene',
    searchForBlock: 'Potraži blok',
    selectExistingLabel: 'Odaberi postojeće {{label}}',
    selectFieldsToEdit: 'Odaberite polja za uređivanje',
    showAll: 'Pokaži sve',
    swapRelationship: 'Zamijeni vezu',
    swapUpload: 'Zamijeni prijenos',
    textToDisplay: 'Tekst za prikaz',
    toggleBlock: 'Prebaci blok',
    uploadNewLabel: 'Učitaj novi {{label}}',
  },
  general: {
    aboutToDelete: 'Izbrisat ćete {{label}} <1>{{title}}</1>. Jeste li sigurni?',
    aboutToDeleteCount_many: 'Upravo ćete izbrisati {{count}} {{label}}',
    aboutToDeleteCount_one: 'Upravo ćete izbrisati {{count}} {{label}}',
    aboutToDeleteCount_other: 'Upravo ćete izbrisati {{count}} {{label}}',
    addBelow: 'Dodaj ispod',
    addFilter: 'Dodaj filter',
    adminTheme: 'Administratorska tema',
    all: 'Svi',
    allCollections: 'Sve kolekcije',
    and: 'i',
    anotherUser: 'Drugi korisnik',
    anotherUserTakenOver: 'Drugi korisnik je preuzeo uređivanje ovog dokumenta.',
    applyChanges: 'Primijeni promjene',
    ascending: 'Uzlazno',
    automatic: 'Automatsko',
    backToDashboard: 'Natrag na nadzornu ploču',
    cancel: 'Otkaži',
    changesNotSaved: 'Vaše promjene nisu spremljene. Ako izađete sada, izgubit ćete promjene.',
    clearAll: 'Očisti sve',
    close: 'Zatvori',
    collapse: 'Sažmi',
    collections: 'Kolekcije',
    columns: 'Stupci',
    columnToSort: 'Stupac za sortiranje',
    confirm: 'Potvrdi',
    confirmCopy: 'Potvrdi kopiju',
    confirmDeletion: 'Potvrdi brisanje',
    confirmDuplication: 'Potvrdi duplikaciju',
    confirmReindex: 'Ponovno indeksirati sve {{collections}}?',
    confirmReindexAll: 'Ponovno indeksirati sve kolekcije?',
    confirmReindexDescription:
      'Ovo će ukloniti postojeće indekse i ponovno indeksirati dokumente u {{collections}} kolekcijama.',
    confirmReindexDescriptionAll:
      'Ovo će ukloniti postojeće indekse i ponovno indeksirati dokumente u svim kolekcijama.',
    copied: 'Kopirano',
    copy: 'Kopiraj',
    copying: 'Kopiranje',
    copyWarning:
      'Na rubu ste prepisivanja {{to}} s {{from}} za {{label}} {{title}}. Jeste li sigurni?',
    create: 'Izradi',
    created: 'Kreirano',
    createdAt: 'Izrađeno u',
    createNew: 'Izradi novo',
    createNewLabel: 'Izradi novo {{label}}',
    creating: 'U izradi',
    creatingNewLabel: 'Izrađivanje novog {{label}}',
    currentlyEditing:
      'trenutno uređuje ovaj dokument. Ako preuzmete, bit će im onemogućeno daljnje uređivanje i mogu izgubiti nespremljene promjene.',
    custom: 'Prilagođen',
    dark: 'Tamno',
    dashboard: 'Nadzorna ploča',
    delete: 'Izbriši',
    deletedCountSuccessfully: 'Uspješno izbrisano {{count}} {{label}}.',
    deletedSuccessfully: 'Uspješno izbrisano.',
    deleting: 'Brisanje...',
    depth: 'Dubina',
    descending: 'Silazno',
    deselectAllRows: 'Odznači sve redove',
    document: 'Dokument',
    documentLocked: 'Dokument je zaključan',
    documents: 'Dokumenti',
    duplicate: 'Duplikat',
    duplicateWithoutSaving: 'Dupliciraj bez spremanja promjena',
    edit: 'Uredi',
    editAll: 'Uredi sve',
    editedSince: 'Uređeno od',
    editing: 'Uređivanje',
    editingLabel_many: 'Uređivanje {{count}} {{label}}',
    editingLabel_one: 'Uređivanje {{count}} {{label}}',
    editingLabel_other: 'Uređivanje {{count}} {{label}}',
    editingTakenOver: 'Uređivanje preuzeto',
    editLabel: 'Uredi {{label}}',
    email: 'Email',
    emailAddress: 'Email adresa',
    enterAValue: 'Unesi vrijednost',
    error: 'Greška',
    errors: 'Greške',
    fallbackToDefaultLocale: 'Vraćanje na zadani jezik',
    false: 'Netočno',
    filter: 'Filter',
    filters: 'Filteri',
    filterWhere: 'Filter {{label}} gdje',
    globals: 'Globali',
    goBack: 'Vrati se',
    isEditing: 'uređuje',
    language: 'Jezik',
    lastModified: 'Zadnja promjena',
    leaveAnyway: 'Svejedno napusti',
    leaveWithoutSaving: 'Napusti bez spremanja',
    light: 'Svijetlo',
    listControlMenu: 'Izbornik za kontrolu popisa',
    livePreview: 'Pregled',
    loading: 'Učitavanje',
    locale: 'Jezik',
    locales: 'Prijevodi',
    menu: 'Izbornik',
    moveDown: 'Pomakni dolje',
    moveUp: 'Pomakni gore',
    newPassword: 'Nova lozinka',
    next: 'Sljedeće',
    noDateSelected: 'Nije odabran datum',
    noFiltersSet: 'Nema postavljenih filtera',
    noLabel: '<Nema {{label}}>',
    none: 'Nijedan',
    noOptions: 'Nema opcija',
    noResults:
      'Nije pronađen nijedan {{label}}. Ili {{label}} još uvijek ne postoji ili nijedan od odgovara postavljenim filterima.',
    notFound: 'Nije pronađeno',
    nothingFound: 'Ništa nije pronađeno',
    noUpcomingEventsScheduled: 'Nema zakazanih nadolazećih događanja.',
    noValue: 'Bez vrijednosti',
    of: 'od',
    only: 'Samo',
    open: 'Otvori',
    or: 'ili',
    order: 'Poredak',
    overwriteExistingData: 'Prepišite postojeće podatke u polju',
    pageNotFound: 'Stranica nije pronađena',
    password: 'Lozinka',
    payloadSettings: 'Payload postavke',
    perPage: 'Po stranici: {{limit}}',
    previous: 'Prethodni',
    reindex: 'Ponovno indeksiraj',
    reindexingAll: 'Ponovno indeksiranje svih {{collections}}.',
    remove: 'Ukloni',
    reset: 'Ponovno postavi',
    resetPreferences: 'Ponovno postavljanje postavki',
    resetPreferencesDescription: 'Ovo će vratiti sve vaše postavke na zadane vrijednosti.',
    resettingPreferences: 'Ponovno postavljanje postavki.',
    row: 'Red',
    rows: 'Redovi',
    save: 'Spremi',
    saving: 'Spremanje...',
    schedulePublishFor: 'Zakazano objavljivanje za {{title}}',
    searchBy: 'Traži po {{label}}',
    selectAll: 'Odaberite sve {{count}} {{label}}',
    selectAllRows: 'Odaberite sve redove',
    selectedCount: '{{count}} {{label}} odabrano',
    selectValue: 'Odaberi vrijednost',
    showAllLabel: 'Prikaži sve {{label}}',
    sorryNotFound: 'Nažalost, ne postoji ništa što odgovara vašem zahtjevu.',
    sort: 'Sortiraj',
    sortByLabelDirection: 'Sortiraj prema {{label}} {{direction}}',
    stayOnThisPage: 'Ostani na ovoj stranici',
    submissionSuccessful: 'Uspješno slanje',
    submit: 'Podnesi',
    submitting: 'Podnošenje...',
    success: 'Uspjeh',
    successfullyCreated: '{{label}} uspješno izrađeno.',
    successfullyDuplicated: '{{label}} uspješno duplicirano.',
    successfullyReindexed:
      'Uspješno ponovno indeksirano {{count}} od {{total}} dokumenata iz {{collections}} kolekcija.',
    takeOver: 'Preuzmi',
    thisLanguage: 'Hrvatski',
    time: 'Vrijeme',
    titleDeleted: '{{label}} "{{title}}" uspješno izbrisano.',
    true: 'Istinito',
    unauthorized: 'Neovlašteno',
    unsavedChanges: 'Imate nespremljene promjene. Spremite ili odbacite prije nastavka.',
    unsavedChangesDuplicate: 'Imate nespremljene promjene. Želite li nastaviti s dupliciranjem?',
    untitled: 'Bez naslova',
    upcomingEvents: 'Nadolazeći događaji',
    updatedAt: 'Ažurirano u',
    updatedCountSuccessfully: 'Uspješno ažurirano {{count}} {{label}}.',
    updatedSuccessfully: 'Uspješno ažurirano.',
    updating: 'Ažuriranje',
    uploading: 'Prijenos',
    uploadingBulk: 'Prenosim {{current}} od {{total}}',
    user: 'Korisnik',
    username: 'Korisničko ime',
    users: 'Korisnici',
    value: 'Vrijednost',
    viewReadOnly: 'Pogledaj samo za čitanje',
    welcome: 'Dobrodošli',
  },
  localization: {
    cannotCopySameLocale: 'Ne može se kopirati na istu lokaciju',
    copyFrom: 'Kopiraj iz',
    copyFromTo: 'Kopiranje iz {{from}} u {{to}}',
    copyTo: 'Kopiraj na',
    copyToLocale: 'Kopiraj na lokaciju',
    localeToPublish: 'Lokacija za objavu',
    selectLocaleToCopy: 'Odaberite mjesto za kopiranje',
  },
  operators: {
    contains: 'sadrži',
    equals: 'jednako',
    exists: 'postoji',
    intersects: 'presijeca',
    isGreaterThan: 'je veće od',
    isGreaterThanOrEqualTo: 'je veće od ili jednako',
    isIn: 'je u',
    isLessThan: 'manje je od',
    isLessThanOrEqualTo: 'manje je ili jednako',
    isLike: 'je kao',
    isNotEqualTo: 'nije jednako',
    isNotIn: 'nije unutra',
    near: 'blizu',
    within: 'unutar',
  },
  upload: {
    addFile: 'Dodaj datoteku',
    addFiles: 'Dodaj datoteke',
    bulkUpload: 'Masovno dodavanje',
    crop: 'Izreži',
    cropToolDescription:
      'Povucite kutove odabranog područja, nacrtajte novo područje ili prilagodite vrijednosti ispod.',
    dragAndDrop: 'Povucite i ispustite datoteku',
    dragAndDropHere: 'ili povucite i ispustite datoteku ovdje',
    editImage: 'Uredi sliku',
    fileName: 'Ime datoteke',
    fileSize: 'Veličina datoteke',
    filesToUpload: 'Datoteke za učitavanje',
    fileToUpload: 'Datoteka za prijenos',
    focalPoint: 'Središnja točka',
    focalPointDescription:
      'Povucite središnju točku izravno na pregledu ili prilagodite vrijednosti ispod.',
    height: 'Visina',
    lessInfo: 'Manje informacija',
    moreInfo: 'Više informacija',
    pasteURL: 'Zalijepi URL',
    previewSizes: 'Veličine pregleda',
    selectCollectionToBrowse: 'Odaberite kolekciju za pregled',
    selectFile: 'Odaberite datoteku',
    setCropArea: 'Postavi područje usjeva',
    setFocalPoint: 'Postavi fokusnu točku',
    sizes: 'Veličine',
    sizesFor: 'Veličine za {{label}}',
    width: 'Širina',
  },
  validation: {
    emailAddress: 'Molimo unesite valjanu e-mail adresu.',
    enterNumber: 'Molimo unesite valjani broj.',
    fieldHasNo: 'Ovo polje nema {{label}}',
    greaterThanMax: '{{value}} exceeds the maximum allowable {{label}} limit of {{max}}.',
    invalidInput: 'Ovo polje ima neispravan unos.',
    invalidSelection: 'Ovo polje ima neispravan odabir.',
    invalidSelections: 'Ovo polje ima sljedeće neispravne odabire:',
    lessThanMin: '{{value}} is below the minimum allowable {{label}} limit of {{min}}.',
    limitReached: 'Dosegnut je limit, može se dodati samo {{max}} stavki.',
    longerThanMin: 'Ova vrijednost mora biti duža od minimalne dužine od {{minLength}} znakova',
    notValidDate: '"{{value}}" nije valjan datum.',
    required: 'Ovo polje je obvezno.',
    requiresAtLeast: 'Ovo polje zahtjeva minimalno {{count}} {{label}}.',
    requiresNoMoreThan: 'Ovo polje zahtjeva ne više od {{count}} {{label}}.',
    requiresTwoNumbers: 'Ovo polje zahtjeva dva broja.',
    shorterThanMax: 'Ova vrijednost mora biti kraća od maksimalne dužine od {{maxLength}} znakova',
    trueOrFalse: 'Ovo polje može biti samo točno ili netočno',
    username:
      'Unesite važeće korisničko ime. Može sadržavati slova, brojeve, crtice, točke i donje crte.',
    validUploadID: 'Ovo polje nije valjani ID prijenosa.',
  },
  version: {
    type: 'Tip',
    aboutToPublishSelection: 'Upravo ćete objaviti sve {{label}} u izboru. Jeste li sigurni?',
    aboutToRestore: 'Vratit ćete {{label}} dokument u stanje u kojem je bio {{versionDate}}',
    aboutToRestoreGlobal: 'Vratit ćete globalni {{label}} u stanje u kojem je bio {{versionDate}}.',
    aboutToRevertToPublished:
      'Vratit ćete promjene u dokumentu u objavljeno stanje. Jeste li sigurni? ',
    aboutToUnpublish: 'Poništit ćete objavu ovog dokumenta. Jeste li sigurni?',
    aboutToUnpublishSelection:
      'Upravo ćete poništiti objavu svih {{label}} u odabiru. Jeste li sigurni?',
    autosave: 'Automatsko spremanje',
    autosavedSuccessfully: 'Automatsko spremanje uspješno.',
    autosavedVersion: 'Verzija automatski spremljenog dokumenta',
    changed: 'Promijenjeno',
    changedFieldsCount_one: '{{count}} promijenjeno polje',
    changedFieldsCount_other: '{{count}} promijenjena polja',
    compareVersion: 'Usporedi verziju sa:',
    confirmPublish: 'Potvrdi objavu',
    confirmRevertToSaved: 'Potvrdite vraćanje na spremljeno',
    confirmUnpublish: 'Potvrdite poništavanje objave',
    confirmVersionRestoration: 'Potvrdite vraćanje verzije',
    currentDocumentStatus: 'Trenutni {{docStatus}} dokumenta',
    currentDraft: 'Trenutni Nacrt',
    currentPublishedVersion: 'Trenutno Objavljena Verzija',
    draft: 'Nacrt',
    draftSavedSuccessfully: 'Nacrt uspješno spremljen.',
    lastSavedAgo: 'Zadnji put spremljeno prije {{distance}',
    modifiedOnly: 'Samo modificirano',
    noFurtherVersionsFound: 'Nisu pronađene daljnje verzije',
    noRowsFound: '{{label}} nije pronađeno',
    noRowsSelected: 'Nije odabrana {{oznaka}}',
    preview: 'Pregled',
    previouslyPublished: 'Prethodno objavljeno',
    problemRestoringVersion: 'Nastao je problem pri vraćanju ove verzije',
    publish: 'Objaviti',
    publishAllLocales: 'Objavi sve lokalne postavke',
    publishChanges: 'Objavi promjene',
    published: 'Objavljeno',
    publishIn: 'Objavi na {{locale}}',
    publishing: 'Objavljivanje',
    restoreAsDraft: 'Vrati kao skicu',
    restoredSuccessfully: 'Uspješno vraćeno.',
    restoreThisVersion: 'Vrati ovu verziju',
    restoring: 'Vraćanje...',
    reverting: 'Vraćanje...',
    revertToPublished: 'Vrati na objavljeno',
    saveDraft: 'Sačuvaj nacrt',
    scheduledSuccessfully: 'Uspješno zakazano.',
    schedulePublish: 'Raspored objavljivanja',
    selectLocales: 'Odaberite jezike',
    selectVersionToCompare: 'Odaberite verziju za usporedbu',
    showingVersionsFor: 'Pokazujem verzije za:',
    showLocales: 'Prikaži jezike:',
    status: 'Status',
    unpublish: 'Poništi objavu',
    unpublishing: 'Poništavanje objave...',
    version: 'Verzija',
    versionCount_many: '{{count}} pronađenih verzija',
    versionCount_none: 'Nema pronađenih verzija',
    versionCount_one: '{{count}} pronađena verzija',
    versionCount_other: '{{count}} pronađenih verzija',
    versionCreatedOn: '{{version}} izrađenih:',
    versionID: 'ID verzije',
    versions: 'Verzije',
    viewingVersion: 'Pregled verzije za {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: 'Pregled verzije za globalni {{entityLabel}}',
    viewingVersions: 'Pregled verzija za {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: 'Pregled verzije za globalni {{entityLabel}}',
  },
}

export const hr: Language = {
  dateFNSKey: 'hr',
  translations: hrTranslations,
}
