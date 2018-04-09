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
    Link,
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const images = {
    amp: require('../assets/amp-logo.png'),
    call: require('../assets/Diagram-1-Call.svg'),
    yieldImage: require('../assets/Diagram-2-Yield.svg'),
    resume: require('../assets/Diagram-7-Resume.svg'),
    returnImage: require('../assets/Diagram-4-Resume.svg'),
    paImage: require('../assets/Diagram-5-Pause.svg'),
    yieldAndResume: require('../assets/Diagram-6-Yield-Resume.svg'),
    yieldAndResumeFiber: require('../assets/Diagram-8-Pause-Resume.svg'),
    jolicode: require('../assets/jolicode.png'),
    redirectionio: require('../assets/redirectionio.svg'),
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
            <Deck theme={theme} progress="number" contentWidth={1440}>
                <Slide>
                    <Layout style={{ display: "inline-box" }}>
                        <Fill>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                  0%
                            </Heading>
                        </Fill>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Callback
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide bgColor="white" align={"center center"}>
                    <Layout>
                        <Fill>
                            <Heading size={3} lineHeight={1} textColor="black">
                                Joel Wurtz
                            </Heading>
                            <Text margin={30}>
                                Travaille sur <Link href={"https://twitter.com/redirectionio"} target="_blank">@redirectionio</Link><br />
                                Un service par <Link href={"https://twitter.com/jolicode"} target="_blank">@jolicode</Link>
                            </Text>
                            <Image height="92" src={images.redirectionio} display="inline" margin={50}/>
                        </Fill>
                        <Fill>
                            <Heading size={3} lineHeight={1} textColor="black">
                                @joelwurtz
                            </Heading>
                            <Text margin={30}>
                                <Link href={"https://twitter.com/joelwurtz"} target="_blank">Twitter</Link>
                                <br />
                                <Link href={"https://github.com/joelwurtz"} target="_blank">GitHub</Link>
                            </Text>
                            <Image src={images.jolicode} display="inline" margin={50}/>
                        </Fill>
                    </Layout>
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
                    <Heading fit size={1}>Javascript n'est pas asynchrone</Heading>
                    <Appear endValue order={1}><Heading fit size={1}>Mais NodeJS oui</Heading></Appear>
                </Slide>
                <Slide>
                    <Heading size={2}>EventLoop ?</Heading>
                    <Text size={6}>
                        Capture les appels asynchrone et envoie un evenement lors de leurs resolution.
                    </Text>
                </Slide>
                <Slide>
                    <Heading size={2}>EventLoop ?</Heading>
                    <List>
                        <Appear><ListItem>Comme n'importe quel système d'evenement (symfony/event-dispatcher)</ListItem></Appear>
                        <Appear><ListItem>Un registre de listeners: Watchers</ListItem></Appear>
                        <Appear><ListItem>Un dispatcher</ListItem></Appear>
                        <Appear><ListItem>Boucle (Loop) sur lui même</ListItem></Appear>
                        <Appear><ListItem>Evenements proviennent d'une source externe (IO)</ListItem></Appear>
                    </List>
                </Slide>
                <Slide>
                    <Heading size={2}>En PHP ?</Heading>
                    <List start={2}>
                        <ListItem>stream_set_blocking</ListItem>
                        <ListItem>stream_select</ListItem>
                        <ListItem>pcntl_async_signals (>= 7.1)</ListItem>
                        <ListItem>Workers : RabbitMQ / Gearman / ...</ListItem>
                        <ListItem>proc_exec</ListItem>
                        <ListItem>Ajax...</ListItem>
                        <ListItem>Mais pas d'event loop</ListItem>
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
                    <Layout style={{ display: "inline-box" }}>
                        <Fill>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                100%
                            </Heading>
                        </Fill>
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
                    <List>
                        <Appear><ListItem>EventLoop</ListItem></Appear>
                        <Appear><ListItem>Socket</ListItem></Appear>
                        <Appear><ListItem>HTTP Server/Client</ListItem></Appear>
                        <Appear><ListItem>DNS</ListItem></Appear>
                        <Appear><ListItem>...</ListItem></Appear>
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
                    <Layout style={{ display: "inline-box" }}>
                        <Fill>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                50%<br />
                                50%
                            </Heading>
                        </Fill>
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
                    <List>
                        <Appear><ListItem>Javascript</ListItem></Appear>
                        <Appear><ListItem>C#</ListItem></Appear>
                    </List>
                </Slide>
                <Slide>
                    <Heading size={2} fit>PHP ? AMP avec yield</Heading>
                    <Image src={images.amp} display="inline" margin={10}/>
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
                    <Image width="100%" src={images.call} />
                </Slide>
                <Slide>
                    <Image width="100%" src={images.yieldImage} />
                </Slide>
                <Slide>
                    <Image width="100%" src={images.resume} />
                </Slide>
                <Slide>
                    <Image width="100%" src={images.returnImage} />
                </Slide>
                <Slide>
                    <Heading size={2}>Librairies</Heading>
                    <List>
                        <ListItem>Tous les librairies de ReactPHP</ListItem>
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
                    <Layout style={{ display: "inline-box" }}>
                        <Fill>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                0%
                            </Heading>
                        </Fill>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Callback
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide>
                    <Layout style={{ display: "inline-box" }}>
                        <Fill>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                0%<br />
                                50%<br />
                                50%
                            </Heading>
                        </Fill>
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
                    <Heading size={2}>Generator</Heading>
                    <Image width="100%" src={images.yieldAndResume} padding={30} />
                </Slide>
                <Slide>
                    <Heading size={2}>Fiber</Heading>
                    <Image width="100%" src={images.yieldAndResumeFiber} padding={30} />
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
                    <Layout style={{ display: "inline-box" }}>
                        <Fill>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                0%<br />
                                0%<br />
                                0%
                            </Heading>
                        </Fill>
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
                    <Layout style={{ display: "inline-box" }}>
                        <Fill>
                            <Heading textAlign="right" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                100%<br />
                                100%
                            </Heading>
                        </Fill>
                        <Fill>
                            <Heading textAlign="left" size={2} caps textColor="secondary" bgColor="white" margin={10}>
                                Asynchrone<br />
                                Bonheur
                            </Heading>
                        </Fill>
                    </Layout>
                </Slide>
                <Slide bgColor="white" align={"center center"}>
                    <Layout>
                        <Fill>
                            <List>
                                <ListItem><Link href={"https://reactphp.org/"} target="_blank">https://reactphp.org/</Link></ListItem>
                                <ListItem><Link href={"https://amphp.org/"} target="_blank">https://amphp.org/</Link></ListItem>
                                <ListItem><Link href={"https://wiki.php.net/rfc/fiber"} target="_blank">Fiber RFC</Link></ListItem>
                                <ListItem><Link href={"https://github.com/jolicode/asynit"} target="_blank">Asynit</Link></ListItem>
                                <Image height="92" src={images.redirectionio} display="inline" margin={85}/>
                            </List>
                        </Fill>
                        <Fill>
                            <Heading size={2}>Merci</Heading>
                            <Heading size={4} margin={50}>Questions ?</Heading>
                            <Image src={images.jolicode} display="inline" margin={50}/>
                        </Fill>
                    </Layout>
                </Slide>
            </Deck>
        );
    }
}
