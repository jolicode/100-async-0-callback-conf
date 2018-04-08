// Import React
import React from "react";
import "prismjs/themes/prism-coy.css";
import "./codeslide.css";
import CodeSlide from "spectacle-code-slide";
import PropTypes from "prop-types";
import preloader from "spectacle/lib/utils/preloader";
// Import Spectacle Core tags
import {
    Appear,
    CodePane,
    Code,
    Deck,
    Heading,
    ListItem,
    List,
    Slide,
    Text,
    Image,
    Layout,
    Fill,
    Fit,
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const images = {
    pauseImage: require('../assets/Diagram-5-Pause.svg'),
    call: require('../assets/Diagram-1-Call.svg'),
    yieldImage: require('../assets/Diagram-2-Yield.svg'),
    resume: require('../assets/Diagram-3-Resume.svg'),
    returnImage: require('../assets/Diagram-4-Resume.svg'),
};

preloader(images);

const theme = createTheme({
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#1F2022",
    quarternary: "#CECECE"
}, {
    primary: "Montserrat",
    secondary: "Helvetica"
});

class ClearCodePaneContext extends React.Component {
    getChildContext() {
        return {
            styles: {
                components: {
                    codePane: null,
                    syntax: null
                },
                prism: {
                    light: null
                }
            }
        };
    }

    render() {
        return this.props.children;
    }
}

ClearCodePaneContext.childContextTypes = {
    styles: PropTypes.object
};

export default class Presentation extends React.Component {
    render() {
        return (
            <Deck transitionDuration={500} theme={theme}>
                <Slide>
                    <Layout>
                        <Fit>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                  0%
                            </Heading>
                        </Fit>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Callback
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide>
                    <Heading size={2}>Moi</Heading>
                </Slide>
                <Slide>
                    <Heading size={2}>Asynchrone ?</Heading>
                </Slide>
                <Slide>
                    <Heading fit size={1}>Parallèle != Asynchrone</Heading>
                    <Heading fit size={1}>Multi-Process != Asynchrone</Heading>
                    <Heading fit size={1}>Multi-Thread != Asynchrone</Heading>
                </Slide>
                <Slide>
                    <Heading fit size={1}>Async = Non-Bloquant</Heading>
                    <Text size={6}>
                        On ne veut pas attendre la réponse pour continuer à travailler.
                    </Text>
                </Slide>
                <Slide>
                    <Heading fit size={1}>Event Loop</Heading>
                    <Text size={6}>
                        Capture les appels asynchrone et envoie un evenement lors de leurs resolution.
                    </Text>
                </Slide>
                <Slide>
                    <Heading fit size={1}>Javascript n'est pas asynchrone</Heading>
                    <Appear endValue order={1}><Heading fit size={1}>Mais NodeJS oui</Heading></Appear>
                </Slide>
                <Slide>
                    <Heading size={2}>En PHP ?</Heading>
                    <List start={2}>
                        <ListItem>stream_set_blocking</ListItem>
                        <ListItem>stream_select</ListItem>
                        <ListItem>pcntl_async_signals (>= 7.1)</ListItem>
                        <ListItem>Workers : RabbitMQ / Gearman / ...</ListItem>
                        <ListItem>Ajax</ListItem>
                        <ListItem>proc_exec (ou pas)</ListItem>
                        <ListItem>No Event Loop</ListItem>
                    </List>
                </Slide>
                <CodeSlide
                    transition={[]}
                    lang="php"
                    fill
                    className="codeslide"
                    color="black"
                    textSize="20"
                    code={require("raw-loader!./event-loop.php")}
                    ranges={[
                        { loc: [0, 270], title: "PHP Event Loop" },
                        { loc: [2, 3], title: "Registre" },
                        { loc: [4, 5], title: "Function Asynchrone" },
                        { loc: [5, 8], title: "Stream non bloquant" },
                        { loc: [9, 15], title: "Watcher" },
                        { loc: [17, 18], title: "Dispatch" },
                        { loc: [18, 25], title: "Evenements" },
                        { loc: [26, 32], title: "Dispatch" },
                        { loc: [33, 36], title: "Loop" },
                        { loc: [38, 46], title: "Utilisation" },
                        // ...
                    ]}
                />
                <Slide>
                    <Layout>
                        <Fit>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                100%
                            </Heading>
                        </Fit>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Callback
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide>
                    <Heading size={2}>Callback Hell</Heading>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

sendRequestAsync($fooRequest, function ($response) {
    $barRequest = $response->data;

    sendRequestAsync($barRequest, function ($response) {
        $bazRequest = $response->data;

        sendRequestAsync($bazRequest, function ($response) {
            ...
        });
    });
});
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2}>ReactPHP</Heading>
                </Slide>
                <Slide>
                    <Heading size={2}>ReactPHP</Heading>
                    <List>
                        <ListItem>EventLoop</ListItem>
                        <ListItem>Socket</ListItem>
                        <ListItem>HTTP Server/Client</ListItem>
                        <ListItem>DNS</ListItem>
                        <ListItem>...</ListItem>
                    </List>
                </Slide>
                <Slide>
                    <Heading size={2}>Promise</Heading>
                    <Text>On vous promet qu'il y aura une réponse</Text>
                </Slide>
                <Slide>
                    <Heading size={2}>Promise</Heading>
                    <List>
                        <ListItem><Code lang="php">public function then($onResolve, $onFailure);</Code></ListItem>
                        <ListItem>Permet de chainer des traitements</ListItem>
                        <ListItem>Gestion d'erreurs</ListItem>
                        <ListItem>Standard (Promise A+)</ListItem>
                    </List>
                </Slide>
                <Slide>
                    <Heading size={2}>Promise Exemple</Heading>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

$promise = $client->sendAsyncRequest($request);
$promise
    ->then(function ($response) {
        return $response->getBody();
    })
    ->then(function ($body) {
        return json_decode($body);
    })
    ->then(function ($json) {
        // DO some stuff
    });
;
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Layout>
                        <Fit>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                50%<br />
                                50%
                            </Heading>
                        </Fit>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Callback<br />
                                Promise
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide>
                    <Heading size={2}>Promise :/</Heading>
                    <List>
                        <ListItem>Impossible de typehint un callback (PHP)</ListItem>
                        <ListItem>Impossible de renvoyer une promise dans un callable (depend de l'implementation)</ListItem>
                        <ListItem>Then, then, then, then ....</ListItem>
                        <ListItem>Simplement un standard sur les callbacks</ListItem>
                    </List>
                </Slide>
                <Slide>
                    <Heading size={2}>Async / Await</Heading>
                </Slide>
                <Slide>
                    <Heading size={2}>Async / Await</Heading>
                    <List>
                        <ListItem>Javascript</ListItem>
                        <ListItem>C#</ListItem>
                    </List>
                </Slide>
                <Slide>
                    <Heading size={2}>PHP ? AMP avec yield</Heading>
                </Slide>
                <Slide>
                    <Heading size={2}>Yield</Heading>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

$response = yield $client->sendAsyncRequest($request);
$body = yield $response->getBody();
$json = json_decode($body);
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2}>Promise</Heading>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

$promise = $client->sendAsyncRequest($request);
$promise->onResolve(function ($response, $error) {
    // ...
});
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2}>Magie ?</Heading>
                </Slide>
                <Slide>
                    <Image width="100%" src={images.call.replace('/', '')} />
                </Slide>
                <Slide>
                    <Image width="100%" src={images.yieldImage.replace('/', '')} />
                </Slide>
                <Slide>
                    <Image width="100%" src={images.resume.replace('/', '')} />
                </Slide>
                <Slide>
                    <Image width="100%" src={images.returnImage.replace('/', '')} />
                </Slide>
                <Slide>
                    <Heading size={2}>Librairies</Heading>
                    <List>
                        <ListItem>EventLoop</ListItem>
                        <ListItem>Socket</ListItem>
                        <ListItem>Dns</ListItem>
                        <ListItem>HTTP Server (HTTP 2 support)</ListItem>
                        <ListItem>HTTP Client (HTTP 2 support)</ListItem>
                        <ListItem>Websocket</ListItem>
                        <ListItem>MySQL</ListItem>
                        <ListItem>PostgreSQL</ListItem>
                        <ListItem>Redis</ListItem>
                        <ListItem>File</ListItem>
                        <ListItem>BeanStalk</ListItem>
                        <ListItem>SSH</ListItem>
                        <ListItem>Process</ListItem>
                        <ListItem>Cache</ListItem>
                        <ListItem>Windows Registry</ListItem>
                    </List>
                </Slide>
                <Slide>
                    <Heading size={2}>Cas d'utilisations</Heading>
                    <List>
                        <ListItem>Tests (jolicode/asynit)</ListItem>
                        <ListItem>Import de données</ListItem>
                        <ListItem>Déploiement</ListItem>
                        <ListItem>Microservice</ListItem>
                        <ListItem>...</ListItem>
                    </List>
                </Slide>
                <Slide>
                    <Layout>
                        <Fit>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                0%
                            </Heading>
                        </Fit>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Callback
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide>
                    <Layout>
                        <Fit>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                0%<br />
                                50%<br />
                                50%
                            </Heading>
                        </Fit>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Callback<br />
                                Promise<br />
                                Yield
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide>
                    <Heading size={2}>Sync / Async API pas compatible</Heading>
                </Slide>
                <Slide>
                    <Heading size={2}>Exemple : PSR7</Heading>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

/**
 * Read data from the stream.
 *
 * @param int $length Read up to $length bytes from the object and return
 *     them. Fewer than $length bytes may be returned if underlying stream
 *     call returns fewer bytes.
 * @return string Returns the data read from the stream, or an empty string
 *     if no bytes are available.
 * @throws \\RuntimeException if an error occurs.
 */
public function read($length);
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2}>Async API</Heading>
                    <Text>Chaque appel asynchrone doit retourner une Promise</Text>
                </Slide>
                <Slide>
                    <Heading size={2}>Fiber : RFC PHP</Heading>
                    <Text>Comme les coroutines LUA</Text>
                </Slide>
                <Slide>
                    <Heading size={2} caps textColor="secondary" bgColor="white" margin={10}>
                        0 Callback<br />
                        0 Promise<br />
                        0 Yield
                    </Heading>
                    <Text>Ce code est synchrone ET asynchrone</Text>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

$response = $client->sendRequest($request);
$body = $response->getBody();
$json = json_decode($body);
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2} fit>Stackfull Generator</Heading>
                    <Image width="100%" src={images.pauseImage.replace('/', '')} />
                </Slide>
                <Slide>
                    <Heading size={2}>Créer une Fiber</Heading>
                    <Text>Ce code est provisoire (RFC)</Text>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

$fiber = new Fiber(function () {
	$app = new Application();
	$app->run();
});

// Lancement de notre application
$stream = $fiber->resume();
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2}>Mettre en pause</Heading>
                    <Text>Ce code est provisoire (RFC)</Text>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

// Plus loin dans le code...
$read = Fiber::yield($stream);
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2}>Resume</Heading>
                    <Text>Ce code est provisoire (RFC)</Text>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

$fiber = new Fiber(function () {
	$app = new Application();
	$app->run();
});

// Lancement de notre application
$stream = $fiber->resume();
$data = fread(stream, 8192);
$stream = $fiber->resume($data);
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2}>Resume</Heading>
                    <Text>Ce code est provisoire (RFC)</Text>
                    <ClearCodePaneContext>
                        <CodePane
                            textSize="20"
                            lang="php"
                            theme="external"
                            source={`
<?php

// Plus loin dans le code...
$read = Fiber::yield($stream);

echo $read;
          `}
                        />
                    </ClearCodePaneContext>
                </Slide>
                <Slide>
                    <Heading size={2}>Sync / Async API Compatible</Heading>
                    <Text>Etre asynchrone n'est plus qu'un détail d'implémentation</Text>
                </Slide>
                <Slide>
                    <Layout>
                        <Fit>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                0%<br />
                                0%<br />
                                0%
                            </Heading>
                        </Fit>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Callback<br />
                                Promise<br />
                                Yield
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide>
                    <Layout>
                        <Fit>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                100%
                            </Heading>
                        </Fit>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Bonheur
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide>
                    <Heading size={2}>Merci</Heading>
                    <Heading size={4}>Questions ?</Heading>
                </Slide>
            </Deck>
        );
    }
}
