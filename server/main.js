 Meteor.startup(() => {
        initialiserSchmilblicks();
});

function initialiserSchmilblicks() {
    if (Schmilblicks.find().count() > 0) {
        console.log(`Schmilblicks déjà existants dans la base de données : ${Schmilblicks.find().count()}.`);
        return;
    }

    const DATA_FILE_NAME = 'schmilblicks';
    const JSON_FILE_EXT = '.json';
    const DATA_SOURCE_PATH = '.data/';

    JSON.parse(Assets.getText(DATA_SOURCE_PATH + DATA_FILE_NAME + JSON_FILE_EXT))['schmilblicks']
    .forEach((schmilblick) => {
        Schmilblicks.insert(schmilblick);
    });

    console.log(`Schmilblicks ajoutés à la base de données : ${Schmilblicks.find().count()}.`);
}

