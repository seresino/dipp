import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { dayData } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { tasks } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { weeklyTasks } from "$lib/server/schema";
import { addDays } from "$lib/utils/helperFunctions";


export async function seed() {
	// Clear existing data
	await db.delete(dailyTasks);
	await db.delete(weeklyTasks);
	await db.delete(mood);
	await db.delete(users);
	await db.delete(dayData);
	await db.delete(tasks);
	await db.delete(modules);

	// Dev start date
	const startDate = new Date();

	const usersData = [
		{
			id: 0,
			username: "ADMIN",
			start_date: startDate.toDateString(),
			meditation: false,
			high_dosage: false,
		},
		{
			id: 1,
			username: "USER1",
			start_date: startDate.toDateString(),
			meditation: true,
			high_dosage: true,
		},
		{
			id: 2,
			username: "USER2",
			start_date: addDays(startDate, -7),
			meditation: true,
			high_dosage: true,
		},
		{
			id: 3,
			username: "USER3",
			start_date: addDays(startDate, -14),
			meditation: true,
			high_dosage: true,
		},
		{
			id: 4,
			username: "USER4",
			start_date: startDate.toDateString(),
			meditation: false,
			high_dosage: true,
		},
		{
			id: 5,
			username: "USER5",
			start_date: addDays(startDate, -7),
			meditation: false,
			high_dosage: true,
		},
		{
			id: 6,
			username: "USER6",
			start_date: addDays(startDate, -14),
			meditation: false,
			high_dosage: true,
		},
		{
			id: 7,
			username: "USER7",
			start_date: addDays(startDate, 30),
			meditation: true,
			high_dosage: true,
		},
		{
			id: 8,
			username: "USER8",
			start_date: addDays(startDate, -30),
			meditation: true,
			high_dosage: true,
		},
	];
	await db.insert(users).values(usersData);
	await db.execute(
		`SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE(MAX(id) + 1, 1), false) FROM users;`
	);

	const dayDataData = [
		{
			id: 1,
			title: "Initial Feelings",
			prompt: "Reflect on your initial feelings about your upcoming psychedelic experience.",
			audio: "test-meditation-1.ogg",
			control:  "test-control-1.ogg"
		},
		{
			id: 2,
			title: "Motivations",
			prompt: "Explore your motivations for choosing to have this psychedelic experience at this time.",
			audio: "test-meditation-2.ogg",
			control:  "test-control-2.ogg"
		},
		{
			id: 3,
			title: "Emotional Expectations",
			prompt: "What expectations do you have about the emotional depth of your upcoming experience?",
			audio: "test-meditation-3.ogg",
			control:  "test-control-3.ogg"
		},
		{
			id: 4,
			title: "Life Influence",
			prompt: "Consider how your past life experiences might influence this psychedelic journey.",
			audio: "test-meditation-4.ogg",
			control:  "test-control-4.ogg"
		},
		{
			id: 5,
			title: "Psychedelic Understanding",
			prompt: "Describe your current understanding of the effects of psychedelics. What aspects intrigue you most?",
			audio: "test-meditation-5.ogg",
			control:  "test-control-5.ogg"
		},
		{
			id: 6,
			title: "Physical Effects",
			prompt: "Reflect on your thoughts about how psilocybin might physically affect you during the experience.",
			audio: "test-meditation-6.ogg",
			control:  "test-control-6.ogg"
		},
		{
			id: 7,
			title: "Unpredictability",
			prompt: "How do you feel about the unpredictable nature of psychedelic experiences?",
			audio: "test-meditation-7.ogg",
			control:  "test-control-7.ogg"
		},
		{
			id: 8,
			title: "Safety Knowledge",
			prompt: "Assess your current knowledge about the safety of the substance and the environment for your experience.",
			audio: "test-meditation-8.ogg",
			control:  "test-control-8.ogg"
		},
		{
			id: 9,
			title: "Personal Strengths",
			prompt: "What personal strengths do you believe will help you navigate this experience?",
			audio: "test-meditation-9.ogg",
			control:  "test-control-9.ogg"
		},
		{
			id: 10,
			title: "Mindfulness Practices",
			prompt: "Describe any meditation, yoga, or mindfulness practices you've been exploring in preparation.",
			audio: "test-meditation-10.ogg",
			control:  "test-control-10.ogg"
		},
		{
			id: 11,
			title: "Journaling Reflection",
			prompt: "Reflect on your journaling experience so far. How has it contributed to your preparation?",
			audio: "test-meditation-11.ogg",
			control:  "test-control-11.ogg"
		},
		{
			id: 12,
			title: "Mental Preparation",
			prompt: "What specific steps are you taking to mentally prepare for your psychedelic experience?",
			audio: "test-meditation-12.ogg",
			control:  "test-control-12.ogg"
		},
		{
			id: 13,
			title: "Building Trust",
			prompt: "How are you building trust with those who will be present during your experience?",
			audio: "test-meditation-13.ogg",
			control:  "test-control-13.ogg"
		},
		{
			id: 14,
			title: "Insightful Conversations",
			prompt: "Describe any significant conversations you've had about your upcoming experience. What insights did you gain?",
			audio: "test-meditation-14.ogg",
			control:  "test-control-14.ogg"
		},
		{
			id: 15,
			title: "Involving Others",
			prompt: "How have you involved your close friends or family in your preparation process?",
			audio: "test-meditation-15.ogg",
			control:  "test-control-15.ogg"
		},
		{
			id: 16,
			title: "Openness",
			prompt: "Reflect on your current level of openness to whatever may unfold during the experience.",
			audio: "test-meditation-16.ogg",
			control:  "test-control-16.ogg"
		},
		{
			id: 17,
			title: "Surrender",
			prompt: "Explore your thoughts on the concept of 'surrender' in the context of your upcoming experience.",
			audio: "test-meditation-17.ogg",
			control:  "test-control-17.ogg"
		},
		{
			id: 18,
			title: "Challenging Moments",
			prompt: "What strategies are you considering for managing potentially challenging moments?",
			audio: "test-meditation-18.ogg",
			control:  "test-control-18.ogg"
		},
		{
			id: 19,
			title: "Grounding Plan",
			prompt: "How do you plan to ground yourself if you feel overwhelmed during the experience?",
			audio: "test-meditation-19.ogg",
			control:  "test-control-19.ogg"
		},
		{
			id: 20,
			title: "Desired Insights",
			prompt: "What potential changes or insights are you hoping this experience might bring?",
			audio: "test-meditation-20.ogg",
			control:  "test-control-20.ogg"
		},
		{
			id: 21,
			title: "Final Intention",
			prompt: "Based on your journey of preparation, reflect on your final intention for the psychedelic experience.",
			audio: "test-meditation-21.ogg",
			control:  "test-control-21.ogg"
		},		
	];

	await db.insert(dayData).values(dayDataData);

	const modulesData = [
		{
			id: 1,
			name: "Knowledge and Expectation",
			description:
				"Welcome to the first module of the DIPP course! This week, the aim is to lay a solid foundation of knowledge about psilocybin and what to expect during your psilocybin session.",
		},
		{
			id: 2,
			name: "Psychophysical Readiness",
			description:
				"In this module, we introduce two grounding techniques that you might find useful before, during and after your psychedelic experience: the 4–6 Breathing Technique and the use of simple mantras. These practices are designed to help you maintain a sense of calm and presence, especially during moments that might feel challenging or overwhelming. You can try these out in your own time to see if they resonate with you.",
		},
		{
			id: 3,
			name: "Safety Planning",
			description:
				"This module is designed to emphasise the importance of safety and trust, both during and after your psychedelic experience. Please make sure that you are completing these sections in a calm, quiet and comfortable environment without any distractions.",
		},
	];

	await db.insert(modules).values(modulesData);

	await db.insert(tasks).values([
		{
			task: "Reading Task 1 - Psilocybin Basics",
			time: 15,
			goal: "The purpose of this task is to enhance your understanding of psilocybin, its origins, effects, and potential benefits and risks. By the end of this task, you should have a clear grasp of psilocybin’s role in mental health research, its neurobiological mechanisms, and considerations for its safe use.",
			materials: [
				"Text: 'Psilocybin Basics'",
				"Notebook or digital note-taking tool",
			],
			instructions: [
				"Read the provided text on psilocybin.",
				"Take notes on key points that cover the basics of psilocybin, including its origins, brain effects, safety, and potential benefits.",
				"Consider any follow-up questions or areas you wish to explore further after reading.",
			],
			specifics:
				`<h3 id="psilocybin-basics">Psilocybin Basics</h3> <h4 id="what-is-psilocybin">What is psilocybin?</h4> <p>Psilocybin is a naturally occurring psychoactive compound found in certain species of mushrooms, commonly known as ‘magic mushrooms’.<sup><a href="https://paperpile.com/c/6MYk2w/qyZVl">1</a></sup> When consumed, psilocybin is converted in the body into psilocin, a substance that interacts with serotonin receptors in the brain, particularly the 5-HT2A receptor.<sup><a href="https://paperpile.com/c/6MYk2w/MHUa9">2</a></sup> This interaction causes changes in perception, mood, and thought patterns, resulting in the psychedelic effects often associated with psilocybin use. These effects can include altered sensory experiences, changes in the perception of time and space, increased introspection, and sometimes a sense of spiritual or emotional connection.<sup><a href="https://paperpile.com/c/6MYk2w/6UbJG">3</a></sup> In recent years, scientific interest in psilocybin has grown due to its potential therapeutic applications in the treatment of various mental health conditions, such as depression <sup><a href="https://paperpile.com/c/6MYk2w/jTN0g+ycyDA">4,5</a></sup>, anxiety disorders, and addiction.<sup><a href="https://paperpile.com/c/6MYk2w/jTN0g+ycyDA">4,5</a></sup></p> <h4 id="where-does-psilocybin-come-from">Where does psilocybin come from?</h4> <p>Psilocybin occurs primarily in mushrooms of the genus Psilocybe, although it has been detected in over 200 other mushroom species.<sup><a href="https://paperpile.com/c/6MYk2w/qyZVl">1</a></sup> These mushrooms can be found in various habitats, particularly in tropical and subtropical regions of the Americas, Europe and Asia. The concentration of psilocybin varies between species and even between mushrooms of the same species, depending on factors such as growth conditions, stage of development, and genetics.<sup><a href="https://paperpile.com/c/6MYk2w/ooA5q">6</a></sup> Psilocybin can also be synthesised in laboratories for research or potential therapeutic purposes.<sup><a href="https://paperpile.com/c/6MYk2w/gSODE">7</a></sup></p> <h4 id="how-does-psilocybin-affect-the-brain">How does psilocybin affect the brain?</h4> <p>Psilocybin creates its psychedelic effects through a fascinating interaction with the brain&#39;s chemical messengers and networks.<sup><a href="https://paperpile.com/c/6MYk2w/MHUa9">2</a></sup></p> <p>As mentioned in the ‘What is psilocybin’ section, when you take psilocybin, your body quickly converts it into another substance called psilocin. Psilocin interacts with the brain&#39;s serotonin system, particularly the 5-HT2A receptors.<sup><a href="https://paperpile.com/c/6MYk2w/uMwuE+QyZv5+yQkRy+lo0uF+u2lhC">8–12</a></sup> Serotonin is a chemical messenger that allows nerve cells to communicate between brain areas involved in mood, perception and cognition. By stimulating the 5-HT2A receptors, psilocin causes a cascade of changes in brain chemistry and function that give rise to the typical psychedelic effects.<sup><a href="https://paperpile.com/c/6MYk2w/O6viu">13</a></sup></p> <p>One of the most striking effects of psilocybin is the alteration of neural networks. Under psilocybin, the brain areas that don&#39;t typically communicate become increasingly connected, leading to a more integrated state. At the same time, networks such as the default mode network (DMN), a brain system associated with self-focused thought and rumination, becomes less active. This temporary disruption of the DMN might contribute to the dissolution of the ego and the sense of unity often reported during psychedelic experiences.<sup><a href="https://paperpile.com/c/6MYk2w/Nf7fl+OA3lC">14,15</a></sup></p> <p>Research has also shown that psilocybin can increase the brain&#39;s capacity to change and create new connections.<sup><a href="https://paperpile.com/c/6MYk2w/BCtk1">16</a></sup> This heightened plasticity may underlie some of the lasting positive changes that people report, as it allows for new perspectives and patterns of thought to emerge.<sup><a href="https://paperpile.com/c/6MYk2w/6UbJG">3</a></sup></p> <p>It&#39;s important to note that while psilocybin causes significant changes in brain function, these effects are temporary. As your body metabolises and eliminates the psilocybin, your brain gradually returns to its normal state. However, the insights, emotional shifts, and changes in perspective that can occur during a psilocybin experience often persist, potentially leading to benefits for mental health and well-being that outlast the brief psilocybin session.<sup><a href="https://paperpile.com/c/6MYk2w/MjQNl+Z8ehh+pL4g1">17–19</a></sup></p> <h4 id="is-taking-psilocybin-safe">Is taking psilocybin safe?</h4> <p>Psilocybin is generally considered safe when used in controlled research settings under the supervision of trained professionals. In these contexts, psilocybin has a low toxicity profile, doesn&#39;t cause physical damage to the brain or other organs, and carries a low risk of addiction or overdose.<sup><a href="https://paperpile.com/c/6MYk2w/ccI9U+s39mc">20,21</a></sup></p> <p>However, the safety of psilocybin use is dependent on context. In uncontrolled environments and without proper preparation and support, the powerful psychological effects of psilocybin can be unpredictable and potentially distressing, particularly for those with a history of mental health issues.<sup><a href="https://paperpile.com/c/6MYk2w/iVLfz+elHrH">22,23</a></sup> Psilocybin can also exacerbate pre-existing psychiatric conditions and impair judgement, leading to potential behavioural risks.</p> <p>In this research study, there are integral safety measures in place to mitigate these risks. These include participant screening, controlled dosing, a supportive team and environment, and post-session integration.</p> <h4 id="what-are-the-potential-benefits-of-psilocybin">What are the potential benefits of psilocybin?</h4> <p>Although it is not a licensed treatment in the UK, research suggests that psilocybin may offer several therapeutic and personal-growth benefits, such as:</p> <ul> <li>Alleviating depression and anxiety, including in cases resistant to conventional treatments.<sup><a href="https://paperpile.com/c/6MYk2w/jTN0g+KR2n1+lNnM1">4,24,25</a></sup></li> <li>Aiding in the cessation of smoking and potentially other forms of addiction when combined with therapy.<sup><a href="https://paperpile.com/c/6MYk2w/SPTzz+ycyDA">5,26</a></sup></li> <li>Increasing openness, self-awareness and perspectival shifts that can lead to positive life changes.<sup><a href="https://paperpile.com/c/6MYk2w/jLpru+ov9F8+2MoWL">27–29</a></sup></li> <li>Enhancing overall psychological well-being, including feelings of connectedness and life satisfaction.<sup><a href="https://paperpile.com/c/6MYk2w/DYhdU+mDn3y">30,31</a></sup></li> <li>Promoting neuroplasticity and cognitive flexibility with potentially long-term underlying benefits.<sup><a href="https://paperpile.com/c/6MYk2w/DgPTq+Ty9nC">32,33</a></sup></li> </ul> <p>These promising potential benefits are most evident when psilocybin is used in controlled, supportive settings and integrated into a therapeutic or personal-growth framework. More research is needed to fully understand who benefits from psilocybin, the range of its therapeutic effects, and its mechanisms of action.</p> <h4 id="who-should-avoid-using-psilocybin">Who should avoid using psilocybin?</h4> <p>Psilocybin is not appropriate for everyone. The following individuals should avoid using psilocybin:</p> <ul> <li>Those with a personal or family history of psychotic disorders, as psilocybin may trigger or worsen psychotic symptoms.</li> <li>People with severe cardiovascular conditions, as psilocybin can temporarily increase heart rate and blood pressure.</li> <li>Pregnant and breastfeeding women, due to the lack of research on psilocybin&#39;s effects in these populations.</li> <li>Individuals with severe anxiety disorders or a history of psychological trauma should only use psilocybin under the guidance of a mental health professional. In the UK, this could only happen if you were part of a clinical trial.</li> <li>People taking certain medications, particularly psychiatric medications, should consult a medical professional before using psilocybin.</li> </ul> <p>Psychological readiness and current life circumstances should also be considered, as those in vulnerable or unstable periods may be at higher risk for adverse reactions.</p> <h4 id="references">References</h4> <ol> <li><a href="http://paperpile.com/b/6MYk2w/qyZVl">Guzmán, G. Hallucinogenic mushrooms in Mexico: An overview. <em>Econ. Bot.</em> <strong>62</strong>, 404–412 (2008).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/MHUa9">Nichols, D. E. Psychedelics. <em>Pharmacol. Rev.</em> <strong>68</strong>, 264–355 (2016).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/6UbJG">Vollenweider, F. X. &amp; Kometer, M. The neurobiology of psychedelic drugs: implications for the treatment of mood disorders. <em>Nat. Rev. Neurosci.</em> <strong>11</strong>, 642–651 (2010).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/jTN0g">Carhart-Harris, R. L. <em>et al.</em> Psilocybin with psychological support for treatment-resistant depression: an open-label feasibility study. <em>Lancet Psychiatry</em> <strong>3</strong>, 619–627 (2016).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/ycyDA">Bogenschutz, M. P. &amp; Johnson, M. W. Classic hallucinogens in the treatment of addictions. <em>Prog. Neuropsychopharmacol. Biol. Psychiatry</em> <strong>64</strong>, 250–258 (2016).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/ooA5q">Stijve, T. &amp; Kuyper, T. W. Occurrence of psilocybin in various higher fungi from several European countries. <em>Planta Med.</em> <strong>51</strong>, 385–387 (1985).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/gSODE">Sherwood, A. M. &amp; Prisinzano, T. E. Novel psychotherapeutics - a cautiously optimistic focus on Hallucinogens. <em>Expert Rev. Clin. Pharmacol.</em> <strong>11</strong>, 1–3 (2018).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/uMwuE">Madsen, M. K. <em>et al.</em> Correction: Psychedelic effects of psilocybin correlate with serotonin 2A receptor occupancy and plasma psilocin levels. <em>Neuropsychopharmacology</em> <strong>44</strong>, 1336–1337 (2019).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/QyZv5">Erkizia-Santamaría, I., Alles-Pascual, R., Horrillo, I., Meana, J. J. &amp; Ortega, J. E. Serotonin 5-HT2A, 5-HT2c and 5-HT1A receptor involvement in the acute effects of psilocybin in mice. In vitro pharmacological profile and modulation of thermoregulation and head-twich response. <em>Biomed. Pharmacother.</em> <strong>154</strong>, 113612 (2022).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/yQkRy">Klein, A. K. <em>et al.</em> Investigation of the Structure–Activity Relationships of Psilocybin Analogues. <em>ACS Pharmacol. Transl. Sci.</em> <strong>4</strong>, 533–542 (2021).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/lo0uF">Dos Santos, R. G., Hallak, J. E., Baker, G. &amp; Dursun, S. Hallucinogenic/psychedelic 5HT2A receptor agonists as rapid antidepressant therapeutics: Evidence and mechanisms of action. <em>J. Psychopharmacol.</em> <strong>35</strong>, 453–458 (2021).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/u2lhC">Raval, N. R. <em>et al.</em> A single dose of psilocybin increases synaptic density and decreases 5-HT2A receptor density in the pig brain. <em>Int. J. Mol. Sci.</em> <strong>22</strong>, 835 (2021).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/O6viu">Carhart-Harris, R. L. &amp; Nutt, D. J. Serotonin and brain function: a tale of two receptors. <em>J. Psychopharmacol.</em> <strong>31</strong>, 1091–1120 (2017).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/Nf7fl">Carhart-Harris, R. L. <em>et al.</em> Neural correlates of the psychedelic state as determined by fMRI studies with psilocybin. <em>Proc. Natl. Acad. Sci. U. S. A.</em> <strong>109</strong>, 2138–2143 (2012).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/OA3lC">Tagliazucchi, E. <em>et al.</em> Increased Global Functional Connectivity Correlates with LSD-Induced Ego Dissolution. <em>Curr. Biol.</em> <strong>26</strong>, 1043–1050 (2016).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/BCtk1">Ly, C. <em>et al.</em> Psychedelics Promote Structural and Functional Neural Plasticity. <em>Cell Rep.</em> <strong>23</strong>, 3170–3182 (2018).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/MjQNl">Johnson, M., Richards, W. &amp; Griffiths, R. Human hallucinogen research: guidelines for safety. <em>J. Psychopharmacol.</em> <strong>22</strong>, 603–620 (2008).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/Z8ehh">Wheeler, S. W. &amp; Dyer, N. A systematic review of psychedelic-assisted psychotherapy for mental health: An evaluation of the current wave of research and suggestions for the future. <em>Psychology of Consciousness: Theory</em> <strong>7</strong>, 279–315 (2020).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/pL4g1">Andersen, K. A. A. &amp; Carhart‐Harris, R. Therapeutic effects of classic serotonergic psychedelics: A systematic review of modern‐era clinical studies. <em>Acta Psychiatrica</em> (2021).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/ccI9U">Johnson, M. W., Griffiths, R. R., Hendricks, P. S. &amp; Henningfield, J. E. The abuse potential of medical psilocybin according to the 8 factors of the Controlled Substances Act. <em>Neuropharmacology</em> <strong>142</strong>, 143–166 (2018).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/s39mc">Tylš, F., Páleníček, T. &amp; Horáček, J. Psilocybin--summary of knowledge and new perspectives. <em>Eur. Neuropsychopharmacol.</em> <strong>24</strong>, 342–356 (2014).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/iVLfz">Evans, J. <em>et al.</em> Extended difficulties following the use of psychedelic drugs: A mixed methods study. <em>PLoS One</em> <strong>18</strong>, e0293349 (2023).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/elHrH">Carbonaro, T. M. <em>et al.</em> Survey study of challenging experiences after ingesting psilocybin mushrooms: Acute and enduring positive and negative consequences. <em>J. Psychopharmacol.</em> <strong>30</strong>, 1268–1278 (2016).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/KR2n1">Carhart-Harris, R. <em>et al.</em> Trial of Psilocybin versus Escitalopram for Depression. <em>N. Engl. J. Med.</em> <strong>384</strong>, 1402–1411 (2021).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/lNnM1">Ross, S. <em>et al.</em> Rapid and sustained symptom reduction following psilocybin treatment for anxiety and depression in patients with life-threatening cancer: a randomized controlled trial. <em>J. Psychopharmacol.</em> <strong>30</strong>, 1165–1180 (2016).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/SPTzz">Johnson, M. W., Garcia-Romeu, A., Cosimano, M. P. &amp; Griffiths, R. R. Pilot study of the 5-HT2AR agonist psilocybin in the treatment of tobacco addiction. <em>J. Psychopharmacol.</em> <strong>28</strong>, 983–992 (2014).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/jLpru">MacLean, K. A., Johnson, M. W. &amp; Griffiths, R. R. Mystical experiences occasioned by the hallucinogen psilocybin lead to increases in the personality domain of openness. <em>J. Psychopharmacol.</em> <strong>25</strong>, 1453–1461 (2011).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/ov9F8">Erritzoe, D. <em>et al.</em> Effects of psilocybin therapy on personality structure. <em>Acta Psychiatr. Scand.</em> <strong>138</strong>, 368–378 (2018).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/2MoWL">Erritzoe, D. <em>et al.</em> Recreational use of psychedelics is associated with elevated personality trait openness: Exploration of associations with brain serotonin markers. <em>J. Psychopharmacol.</em> <strong>33</strong>, 1068–1075 (2019).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/DYhdU">Griffiths, R. R., Richards, W. A., McCann, U. &amp; Jesse, R. Psilocybin can occasion mystical-type experiences having substantial and sustained personal meaning and spiritual significance. <em>Psychopharmacology</em> <strong>187</strong>, 268–83; discussion 284–92 (2006).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/mDn3y">Watts, R., Day, C., Krzanowski, J., Nutt, D. &amp; Carhart-Harris, R. Patients’ accounts of increased ‘connectedness’ and ‘acceptance’ after psilocybin for treatment-resistant depression. <em>J. Humanist. Psychol.</em> <strong>57</strong>, 520–564 (2017).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/DgPTq">Sloshower, J. <em>et al.</em> Psychological flexibility as a mechanism of change in psilocybin-assisted therapy for major depression: results from an exploratory placebo-controlled trial. <em>Sci. Rep.</em> <strong>14</strong>, 8833 (2024).</a></li> <li><a href="http://paperpile.com/b/6MYk2w/Ty9nC">Davis, A. K., Barrett, F. S. &amp; Griffiths, R. R. Psychological flexibility mediates the relations between acute psychedelic effects and subjective decreases in depression and anxiety. <em>J Contextual Behav Sci</em> <strong>15</strong>, 39–45 (2020).</a></li> </ol>`,
			module_id: 1,
		},
		{
			task: "Reading Task 2 - Practical Concerns Regarding the Session",
			time: 15,
			goal: "This task aims to familiarise you with the practical aspects of participating in a psilocybin study, including how psilocybin will be administered, what to expect during the session, and how to navigate challenging moments. By the end of this task, you should have a clear understanding of the psilocybin session’s phases, safety measures, and the importance of integration post-experience.",
			materials: [
				"Text: 'Practical Concerns Regarding the Session'",
				"Notebook or digital tool for note-taking",
			],
			instructions: [
				"Read the provided text on the practical concerns of a psilocybin session.",
				"Take notes on key topics such as psilocybin administration, phases of the experience, and guidance on handling challenging moments.",
				"Reflect on any questions or concerns you have about the session.",
			],
			specifics:
				`<h3 id="practical-concerns-regarding-the-session">Practical Concerns Regarding the Session</h3> <h4 id="how-will-psilocybin-be-administered-in-this-study">How will psilocybin be administered in this study?</h4> <p>In this study, psilocybin will be administered orally in capsule form. Each capsule contains a carefully measured dose of synthetic psilocybin, which has been prepared under strict pharmaceutical conditions to ensure purity and consistency. This method of administration offers several benefits compared to consuming natural mushrooms or other forms of psilocybin:</p> <ul> <li>It allows for precise dosing, ensuring that all participants receive the same amount. This standardised approach to psilocybin administration is crucial in research settings. By eliminating the variability in psilocybin content that can occur with natural mushrooms, the use of capsules also provides a more predictable and consistent experience for participants, prioritising safety as well as maximising the scientific value of the study.</li> <li>Capsules also offer a non-invasive, convenient and discreet way to administer the compound, which is important for maintaining the study&#39;s blinding procedures and ensuring participant comfort.</li> </ul> <h4 id="what-can-i-expect-during-my-psilocybin-experience">What can I expect during my psilocybin experience?</h4> <p>The psilocybin journey is a deeply personal and often unpredictable experience. While each individual&#39;s journey is unique, the following sections offer a general guide to the different phases you may encounter. As you prepare for your own experience, remember that approaching it with an open mind, curiosity, and a willingness to let go of control can help create a positive and insightful experience.</p> <p><em>Onset phase (20–60 minutes after ingestion)</em><br>Your psilocybin experience will typically last 4–6 hours. In the onset phase (20–60 minutes after ingestion), you may notice subtle shifts in perception. Visually, this can include enhanced colours, more pronounced patterns and geometric shapes, or ‘breathing’ effects, where inanimate objects seem to pulsate or move rhythmically. Your sensitivity to sounds and music may increase and you might even experience synaesthesia. Time may seem to slow down or speed up, and distances may appear distorted. Physically, you might feel bodily sensations like tingling or ‘energy shifts’ throughout the body, increased heart rate and blood pressure, possible nausea, stomach discomfort or vomiting, and restlessness or desire to move around.</p> <p>Emotionally, feelings of nervousness, excitement or even apprehension are common as you acclimate to the effects of the psilocybin. During this onset or ‘coming up’ phase, it is helpful to embrace the experience fully, allowing yourself to observe the unfolding effects with curiosity and openness. Trust the process, stay present and remember that these sensations are a temporary and a normal part of the psilocybin journey. The purpose of this preparation course is to equip you with techniques to help you flow with it.</p> <p><em>Peak phase (2-4 hours after ingestion)</em><br>The peak phase (2–4 hours post-ingestion) brings the most intense psilocybin effects. Vivid hallucinations, both with eyes open and closed, are common, although not everyone experiences visual effects. Perception of time and space may feel distorted. Emotions can intensify greatly and span a wide spectrum, from euphoria or bliss to deep introspection. This can lead to reflections on personal experiences, relationships, and existential questions. During this peak phase, some people experience the so-called ego-dissolution. People often find this aspect difficult to put into words, but it has been described as feeling like you have merged with the universe, a sense of boundlessness, or a profound shift in perspective about your place in the world. While this experience can be awe-inspiring, it can also feel overwhelming or challenging at times. If you feel overwhelmed, remember that, as members of the team (who you will already have met) we will be there to support you. We will remind you to trust the process and that these sensations are temporary and part of the psilocybin journey.</p> <p><em>Comedown phase (4-6 hours after ingestion)</em><br>In the comedown phase, as effects gradually subside, you may reflect on the peak phase, and even start the process of ‘integrating’ or making sense of any insights gained. A sense of peace, clarity and deep relaxation can often accompany this stage, though some physical and mental fatigue is also normal.</p> <h4 id="how-can-i-set-intentions-for-my-session">How can I set intentions for my session?</h4> <p>Setting an intention for your psilocybin session is a valuable way to guide your experience. In the lead-up to your session, take some time to reflect on what you hope to achieve or explore. This could be, for example, the development of personal insights, emotional healing, spiritual growth, or simply an open-minded exploration.</p> <p>Having a clear intention can provide focus and meaning. However, it&#39;s equally important to remain open to whatever experience unfolds. Sometimes, the most profound insights come unexpectedly. Remember, your intention is a guide, not a strict goal. It&#39;s okay if your experience deviates from your intention. Trust in the process and allow yourself to surrender to the journey.</p> <p>Over the course of DIPP, you will complete daily journal prompts. Many of these prompts are designed to help you reflect on your intention as well. This regular journaling practice can deepen your understanding of your intention, help you track your thoughts and feelings leading up to the session, and provide valuable insights both before and after your psilocybin experience.</p> <h4 id="what-should-i-do-if-i-encounter-a-challenging-or-overwhelming-moment">What should I do if I encounter a challenging or overwhelming moment?</h4> <p>During a psilocybin experience, it&#39;s normal to encounter challenging moments. These can be intense, but they&#39;re often part of the therapeutic process and can lead to significant personal insights. If you find yourself in a difficult place during your journey, remember that surrendering to the experience is key.</p> <p>‘Surrendering’ isn&#39;t about actively doing something, but rather about allowing whatever arises to be present without trying to control or resist it. It&#39;s about trusting that the process is unfolding as it needs to, even if it&#39;s uncomfortable.</p> <p>To help you navigate challenging moments:</p> <ol> <li>Trust the process: Remember that everything you&#39;re experiencing is temporary and part of the journey.</li> <li>Allow the experience: Instead of fighting against difficult feelings or thoughts, try to let them be present without judgement.</li> <li>Use grounding techniques: In Week 2, you&#39;ll learn some helpful exercises like the 4-6 breathing technique and a simple mantra affirmation. These can help you stay grounded if things become challenging.</li> <li>Remember your coping strategies: In Week 3, you&#39;ll create a personalised coping strategy plan. This will be a valuable resource during your experience.</li> <li>Reach out to your facilitator: They&#39;re there to support you and can provide guidance if needed.</li> </ol> <p>Remember, surrendering doesn&#39;t mean you&#39;re helpless. It&#39;s an active choice to trust the process and allow for growth and insights. By letting yourself fully experience and move through challenging moments, you create space for potentially transformative experiences.</p> <h4 id="what-is-the-importance-of-integration-after-a-psilocybin-experience">What is the importance of integration after a psilocybin experience?</h4> <p>Integration is the crucial process of making sense of the experience of, and insights from your psilocybin journey and applying these to your daily life.<sup><a href="https://paperpile.com/c/Bw44iP/2HPO1">1</a></sup> While the psilocybin experience itself can be profound and transformative, the real work of creating lasting positive change happens after the session through deliberate integration.<sup><a href="https://paperpile.com/c/Bw44iP/XHHr1">2</a></sup> Integration allows you to process and find meaning in your psilocybin journey. It helps translate profound realisations and emotional breakthroughs into concrete, positive changes in your thoughts, behaviours and relationships.<sup><a href="https://paperpile.com/c/Bw44iP/2JsV9">3</a></sup> Proper integration supports you in navigating any challenging aspects of the experience and provides clarity on how to implement insights in a practical, sustained way.<sup><a href="https://paperpile.com/c/Bw44iP/mtpEf">4</a></sup></p> <p>In Module 3 of this preparation course, you will receive guidance on creating your own personalised integration plan. This plan will be tailored to your unique needs, serving as a roadmap for your ongoing growth and self-discovery after the psilocybin session. Your active participation in creating this plan is crucial. Reflect on what practices will best support you in processing and applying the lessons of your journey. This might include journaling, meditation, creative expression, time in nature, or talking with a therapist or supportive friends. The most effective integration involves committing to regular, ongoing practices that resonate with your needs and goals.</p> <p>Remember, while your personalised plan will guide you, integration is a highly individual process. It requires your active participation and dedication. Approach it with patience, self-compassion, and a spirit of open curiosity.</p> <h4 id="what-is-the-legal-status-of-psilocybin-in-the-uk">What is the legal status of psilocybin in the UK?</h4> <p>Psilocybin is classified as a Class A drug under the UK Misuse of Drugs Act 1971. This classification means that it&#39;s illegal to manufacture, possess, supply, or import psilocybin without a licence. The penalties for these offences can be severe, including imprisonment. However, there&#39;s growing interest and research into the therapeutic potential of psilocybin, leading to discussions about legal reform.</p> <p>In the context of this study, we have obtained ethical approval and a licence from the UK Home Office to legally administer psilocybin. This licence allows us to use psilocybin within the strict confines of our scientific research, ensuring that we comply with all legal requirements. Participants in this study can be assured, therefore, that their involvement, and the administration of psilocybin, is fully authorised and regulated under current UK laws. This legal framework is essential for conducting research that is safe, controlled and compliant with national regulations.</p> <h4 id="if-i-have-concerns-or-questions-after-reading-this-how-should-i-proceed">If I have concerns or questions after reading this, how should I proceed?</h4> <p>If your questions are specific to the study or your participation in it, reach out to the study coordinators or researchers.</p> <h4 id="references">References</h4> <ol> <li><a href="http://paperpile.com/b/Bw44iP/2HPO1">Bathje, G. J., Majeski, E. &amp; Kudowor, M. Psychedelic integration: An analysis of the concept and its practice. <em>Front. Psychol.</em> <strong>13</strong>, 824077 (2022).</a></li> <li><a href="http://paperpile.com/b/Bw44iP/XHHr1">Phelps, J. Developing Guidelines and Competencies for the Training of Psychedelic Therapists. <em>Journal of Humanistic Psychology</em> <strong>57</strong>, 450–487 (2017).</a></li> <li><a href="http://paperpile.com/b/Bw44iP/2JsV9">Watts, R., Day, C., Krzanowski, J., Nutt, D. &amp; Carhart-Harris, R. Patients’ accounts of increased ‘connectedness’ and ‘acceptance’ after psilocybin for treatment-resistant depression. <em>J. Humanist. Psychol.</em> <strong>57</strong>, 520–564 (2017).</a></li> <li><a href="http://paperpile.com/b/Bw44iP/mtpEf">Earleywine, M., Low, F., Lau, C. &amp; De Leo, J. Integration in psychedelic-assisted treatments: Recurring themes in current providers’ definitions, challenges, and concerns. <em>J. Humanist. Psychol.</em> 002216782210858 (2022).</a></li> </ol>`,
			module_id: 1,
		},
		{
			task: "4–6 Breathing Technique",
			time: 15,
			goal: "The aim of this task is to teach you the 4–6 Breathing Technique, a method designed to help you relax and reduce stress. By the end of this session, you will have practised a tool that can calm your mind and body, particularly useful for preparing yourself for intense experiences like a psychedelic session.",
			materials: [
				"A quiet, comfortable space",
				"Optional: calming music or ambient sounds",
				"Timer (optional)",
			],
			instructions: [
				"Find a quiet, comfortable space to sit or lie down undisturbed. Optionally, you can play calming music or ambient sounds.",
				"Begin by inhaling through your nose for a count of 4, allowing your chest and abdomen to expand.",
				"Slowly exhale through your mouth for a count of 6, gently releasing the air.",
				"Continue this breathing pattern for 5–10 minutes, focusing on the rhythm of your breath and noticing the calming effect.",
				"If you feel dizzy or lightheaded, pause and adjust the duration as necessary. Once the session is over, get up slowly if you're seated or lying down.",
			],
			specifics:
				`<h3 id="the-46-breathing-technique">The 4–6 Breathing Technique</h3> <p>The 4–6 Breathing Technique is a simple and powerful way to calm your body and mind. This slow, controlled breathing helps shift your body from a state of stress to one of relaxation by regulating the autonomic nervous system. This technique can be particularly helpful before a psychedelic session, and it’s a tool you can return to if you encounter any challenging moments. With regular use, this breathing exercise can become a reliable tool for maintaining calm and emotional balance.</p>`,
			module_id: 2,
		},
		{
			task: "Simple Mantra Affirmation Technique",
			time: 15,
			goal: "The goal of this task is to familiarise you with the Simple Mantra Affirmation Technique, which can help ground you during intense experiences. By the end, you will have practised repeating a personal mantra to develop a sense of calm and reassurance, especially useful during challenging moments in a psychedelic session.",
			materials: ["A quiet, comfortable space", "A personal mantra"],
			instructions: [
				"Reflect on and choose a personal mantra that resonates with you, such as 'I am at peace' or 'I trust in this journey.'",
				"Find a quiet space where you can sit comfortably and won’t be disturbed.",
				"Repeat your chosen mantra, either aloud or silently in your mind, for about 10–15 minutes. Focus on the rhythm and meaning of the words.",
				"If your mind starts to wander, gently bring your attention back to the mantra.",
			],
			specifics:
				`<h3 id="the-simple-mantra-affirmation-technique">The Simple Mantra Affirmation Technique</h3> <p>The Simple Mantra Affirmation Technique is a powerful method for grounding yourself, especially during moments of intensity. Through regular practice, your mantra will become a familiar and calming anchor, one you can turn to during challenging moments in a psychedelic experience. The goal isn’t to block out thoughts or emotions but to use the mantra as a gentle point of focus, helping you maintain a sense of peace and composure.  </p>`,
			module_id: 2,
		},
		{
			task: "Developing Coping Strategies",
			time: 30,
			goal: "The goal of this task is to help you create a personalised set of coping strategies for managing challenging moments during your psychedelic experience. By reflecting on past experiences and potential triggers, you will feel more prepared and confident during the session.",
			materials: [
				"Notebook or digital tool for journaling",
				"The Resource Bank provided",
				"A quiet, comfortable space for reflection",
			],
			instructions: [
				"This task is broken down into steps designed to guide you in developing effective strategies. Please follow each step carefully, reflecting on your personal experiences as you go.",
			],
			specifics:
				`<h3 id="developing-coping-strategies">Developing Coping Strategies</h3> <p>This task is designed to help you create a personalised set of <strong>coping strategies</strong> that can be used during challenging moments in your psychedelic experience. By proactively preparing for potential challenges, you can approach your session with increased confidence and a sense of control.</p> <h4 id="1-reflect-on-past-experiences-5-minutes">1. Reflect on past experiences (5 minutes)</h4> <p>Find a quiet, comfortable place where you won&#39;t be disturbed. Spend 5 minutes journaling about times when you felt stressed or anxious. Consider what happened, how you felt, and what helped you feel better. Write down the specific techniques that helped you cope, such as deep breathing, self-talk, seeking support from others, or focusing on calming objects. There are no wrong answers; the aim is to identify personal strategies that have worked for you in the past. These reflections will serve as a valuable resource for managing future challenges.</p> <h4 id="2-identify-potential-psychedelic-experience-triggers-5-minutes">2. Identify potential psychedelic experience triggers (5 minutes)</h4> <p>Take 5 minutes to list possible sources of discomfort or anxiety during a psychedelic experience. Consider things like intense visual phenomena, feelings of losing or having lost control, or encounters with emotionally charged memories or entities. Be honest and specific with yourself about what might unsettle you. This exercise helps to prepare you mentally, allowing you to develop coping strategies in advance. Remember, awareness of potential triggers is a key step in managing them effectively.</p> <h4 id="3-review-the-resource-bank-5-minutes">3. Review the resource bank (5 minutes)</h4> <p>Carefully read through the Resource Bank provided below. It contains three main categories of methods, or tools, that can be used alone or in combination with others: <strong>environmental adjustment, body-oriented, and mental</strong>. As you review them, consider which tools might work best for you when handling challenging experiences.</p> <ul> <li><p><strong>Environmental adjustment tools</strong> focus on external changes that can influence your internal state, by <strong>altering your surroundings and immediate physical circumstances</strong> to create a more supportive or comfortable experience. You can use these tools before dosing and also during the session. They include:  </p> <ul> <li>Adjusting your <strong>location within the designated space</strong>: relocating to a different part of the room, moving to another piece of furniture, standing up briefly, or using the bathroom when necessary.  </li> <li>Modifying <strong>audio experience</strong>: adjusting volume, pausing or resuming the preset playlist, removing or replacing headphones, or opting for silence.  </li> <li>Adjusting <strong>lighting</strong>: turning side lamps on or off, activating, dimming or deactivating overhead lights as needed.  </li> <li>Modifying <strong>temperature</strong>: adjusting room thermostat, opening/closing windows, adding or removing layers of clothing such as blankets or sweaters.  </li> <li>Modifying <strong>level of interpersonal interaction:</strong> requesting assistance from session sitters, asking for reduced interaction or privacy when needed.  </li> <li>Changing your <strong>visual input</strong>: opening or closing your eyes, using eye shades.</li> </ul> </li> <li><p><strong>Body-oriented tools</strong> help you to become more present and to be in touch with your emotional state by <strong>actively engaging with your body</strong>. These include:  </p> <ul> <li><strong>Breathing exercise</strong>: focusing on slow, stable breathing or trying deeper, longer breaths. Think back to the breathing exercise you learned in Module 2.  </li> <li><strong>Body awareness</strong>: grounding yourself by scanning each body part, noticing how each  feels and how they support you. This can involve conscious movements or non-movements.  </li> <li><strong>Posture changes</strong>: adjusting your shoulders, adjusting the sitting position, performing any movement that feels good, even dancing.  </li> <li><strong>Creative expression</strong>: drawing or painting.  </li> <li><strong>Touch:</strong> this can include self-touch (e.g., hugging, touching or holding yourself for comfort and grounding), or holding hands with one of your sitters (which will be pre-discussed and consented to before the session).</li> </ul> </li> <li><p><strong>Mental tools</strong> offer various cognitive strategies that help you to be present in the experience while not being overwhelmed by the challenges. These include:  </p> <ul> <li><strong>Emotional awareness</strong>: Pause and notice your feelings without judgement. Describe the emotion to yourself: ‘I&#39;m feeling anxiety in my chest.’ Remind yourself that emotions are temporary: ‘This feeling will pass.’ To get an idea of how to relate differently to your thoughts while still accepting their presence, you can check out <a href="https://www.youtube.com/watch?v=Z29ptSuoWRc">this</a> short video.  </li> <li><strong>Thought separation</strong>: Imagine your thoughts as separate entities and let them &#39;talk&#39;. Remind yourself that you are not these thoughts, but a witness to them. To get an idea of how to see yourself and your thoughts ‘as context’, you can check out <a href="https://portlandpsychotherapy.com/wp-content/uploads/sites/28/act_observer_exercise.mp3">this</a> exercise  </li> <li><strong>Active visualisation</strong>: Imagine a safe, peaceful place in detail (e.g. a beach or a forest, etc.). Visualise difficult emotions as shapes or colours, then watch them change or dissolve. Picture yourself successfully navigating the challenge they present. Create a mental &#39;control room&#39; where you can adjust dials for intensities of feeling.</li> </ul> </li> </ul> <p>Remember, the effectiveness of different tools and strategies varies between individuals. Reflect on your preferences and past experiences to identify those that resonate most with you. This preparation will help you to more effectively navigate challenges during your psychedelic experience.</p> <h4 id="4-developing-and-organising-coping-strategies-15-minutes">4. Developing and organising coping strategies (15 minutes)</h4> <p>Take about 15 minutes to create a personal reference guide for managing challenges during your psychedelic experience. This task involves two main steps:</p> <ol> <li><strong>Develop strategies</strong> (10 minutes): For each trigger you identified earlier, think about which coping strategies might help you to manage the challenge. Draw from past experiences or consider new approaches that might work for you, including but not limited to those listed above. For example, for difficult emotions, you could remind yourself that the experience is temporary and that it&#39;s safe to express your feelings, e.g. through speech, active visualisation or creative outputs.  </li> <li><strong>Create a reference guide</strong> (5 minutes): Organise your triggers and strategies into a concise table for easy reference. Keep it brief and clear so you can easily remember or refer to it during your session. Remember, your sitter is there to support you, so include their assistance in your strategies if helpful. Use the following format:</li> </ol> <table> <thead> <tr> <th align="left">Trigger</th> <th align="left">Feelings</th> <th align="left">Thoughts</th> <th align="left">Acceptance</th> <th align="left">Action</th> </tr> </thead> <tbody><tr> <td align="left">What situation or event might trigger the problem</td> <td align="left">What uncomfortable emotions or physical sensations might you notice?</td> <td align="left">What unhelpful or distressing thoughts might you get caught up in?</td> <td align="left">What can you do to disentangle your thoughts and allow yourself to feel them?</td> <td align="left">What action can you take to reduce the unpleasantness?</td> </tr> <tr> <td align="left"></td> <td align="left"></td> <td align="left"></td> <td align="left"></td> <td align="left"></td> </tr> <tr> <td align="left"></td> <td align="left"></td> <td align="left"></td> <td align="left"></td> <td align="left"></td> </tr> </tbody></table> <p>You&#39;ve now created a personalised plan to help you navigate your psychedelic experience. This preparation is a valuable step towards ensuring it is safe and meaningful. Remember, if you have any questions or concerns about potential triggers, don&#39;t hesitate to contact the experimenters before your session. We&#39;ll set aside time before dosing to review your coping strategies and address any remaining questions. Your trained sitter will be present throughout your experience to provide guidance and support.  </p>`,
			module_id: 3,
		},
		{
			task: "Planning Integration",
			time: 30,
			goal: "The goal of this task is to help you develop a practical and personalised plan for integrating your psychedelic experience into your daily life. Integration ensures that the insights and growth you experience during your session are transformed into meaningful, long-term changes. By creating a structured integration plan, you’ll feel more prepared to apply the lessons from your journey and continue your personal development in the weeks and months ahead.",
			materials: [
				"Notebook or digital tool for journaling",
				"The Integration Resource Bank provided",
				"Calendar or planner for scheduling activities",
				"A quiet, comfortable space for reflection",
			],
			instructions: [
				"This task is broken down into steps designed to guide you in developing an integration plan. Please follow each step carefully, reflecting on your personal experiences as you go.",
			],
			specifics:
				`<h3 id="planning-integration">Planning Integration</h3> <p><strong>Integration</strong> is a crucial step in your psychedelic journey. Think of integration as a bridge: On one side is your psychedelic experience, full of insights, emotions and new perspectives. On the other side is your daily life. Integration is how you cross that bridge, carrying the valuable parts of your experience with you. Remember, integration involves not only processing the experience afterwards, but also preparing for, and handling the psychedelic journey itself. This is why it is especially important to diligently complete all the preparatory steps. In the previous task and in Module 1 we have addressed integration before and during the session. This is what integration involves after the experience:</p> <ol> <li><strong>Reflection</strong>: Taking time to think about what happened during your experience. What did you feel? What ideas came to you?</li> <li><strong>Processing:</strong> Working through the emotions and thoughts that came up, whether they were challenging or inspiring.</li> <li><strong>Application:</strong> Using your new insights in your daily life. This might mean changing habits, seeing things differently, or solving problems in new ways.</li> <li><strong>Growth:</strong> Taking active steps towards personal development based on what you learned.</li> </ol> <p>Focusing on integration is an important step towards ensuring that your psychedelic experience has a lasting, positive impact on your life. It&#39;s not just about having a powerful experience – it&#39;s about using that experience to create meaningful, long-term changes in your life. Remember, integration is a personal process. What works best for you might be different from what works for others. The key is to approach it with openness, patience and commitment.</p> <h4 id="1-reflections-5-minutes">1. Reflections (5 minutes):</h4> <p>Find a quiet space and relax. Reflect on your goals for your psychedelic experience. Write down your thoughts on:</p> <ul> <li>Personal growth areas (e.g. overcoming fear, increasing empathy)</li> <li>Values you want to connect with (e.g. authenticity, compassion)</li> <li>Things you&#39;d like to accept about yourself or your life</li> <li>Insights or understandings you&#39;re seeking</li> </ul> <p>There&#39;s no right or wrong way to do this. Your reflections will help to guide your experience.</p> <h4 id="2-integration-resources-5-minutes">2. Integration resources (5 minutes):</h4> <p>As you prepare for your psychedelic experience, it&#39;s important to consider how you&#39;ll integrate your insights into your daily life afterwards. Remember that integration is a personal journey, and what works best varies from person to person. Let&#39;s explore some effective methods you might find helpful.</p> <ul> <li><strong>Self-care</strong> forms the foundation of good integration. In the days following your session, prioritise rest and relaxation. Aim for a full night&#39;s sleep and consider taking some time off work if possible. Nature can be a powerful ally in processing your experience – try spending time in a park, garden or wilderness area each day. You might also benefit from spending less time online during these days, limiting social media use to give yourself space to reflect.</li> <li><strong>Reflection and processing</strong> are key to integration. Many find journaling to be a valuable tool, spending time each day writing about their insights and experiences. Meditation can help you to stay grounded and to continue accessing the mindset from your session. Don&#39;t underestimate the power of sharing – talking with trusted friends or support group members can provide new perspectives and emotional support.</li> <li><strong>Creative expression</strong> often opens new channels for integration. You might feel drawn to visual arts, like drawing or painting, as ways to express what words can&#39;t capture. Music can be deeply moving during this time, whether you&#39;re listening or creating your own. Movement practices like dance or yoga can help you to process emotions and insights too.</li> <li>Other <strong>practices that connect body and mind</strong> can also be particularly powerful for integration. Yoga, tai chi, or simple stretching routines can help you stay present and grounded. Breathwork techniques, from basic deep breathing to more advanced practices, can be calming and insightful. A daily body scan meditation before bed can improve your sleep and body awareness.</li> <li>Lastly, remember that <strong>connection and community</strong> play a vital role in integration. Sharing your experience with understanding friends or family can be profoundly healing. You might consider joining an in-person or a remote integration circle, where you can connect with others on similar journeys. You can also seek the help of a therapist or counsellor. Some people find that acts of kindness or volunteer work help them embody the insights they&#39;ve gained.</li> </ul> <p>As you read through these suggestions, notice which ones resonate with you. There&#39;s no need to do everything – choose a few practices that feel meaningful and manageable within your daily life. Remember, integration is an ongoing process, so select activities you can sustain over time. Your journey of growth and self-discovery continues long after the dosing day itself.</p> <h4 id="3-integration-schedule-10-minutes">3. Integration schedule (10 minutes):</h4> <p>Let&#39;s take some time now to create a practical schedule for your integration activities. This plan will help you maintain the insights and benefits you gained from your psilocybin experience over time. We&#39;ll break this down into three phases: the first week, the first month, and the next three months.</p> <ol> <li>Start by thinking about <strong>the week immediately following your session</strong>. This is a crucial time for integration, so consider planning daily activities. You might want to set aside 15 minutes each morning for meditation and another 15 minutes in the evening for journaling. Write down these <strong>daily commitments</strong>.</li> <li>Next, let&#39;s look at <strong>the first month</strong>. Think about activities you can realistically do <strong>each week</strong>. Maybe you&#39;d like to take a nature walk every Sunday, or attend an integration support group meeting every Thursday evening. Jot down these weekly plans.</li> <li>Finally, consider the <strong>next three months</strong>. What activities can you commit to on a <strong>monthly basis</strong> to keep your integration process going? Perhaps you&#39;d like to schedule a monthly art therapy session, or set aside time at the end of each month to review your integration progress.</li> </ol> <p>As you&#39;re making this schedule, remember to include a variety of activities. Mix reflection (like journaling) with creative expression (like art), physical activities (like nature walks), and social support (like group meetings). Be realistic about what you can commit to, considering your other life responsibilities. Remember, it&#39;s okay to start small – consistency is more important than quantity. And don&#39;t worry – your plan isn&#39;t set in stone. As you go through your integration journey, feel free to adjust your schedule based on what you find most helpful and manageable.</p> <h4 id="4-support-network-5-minutes">4. Support network (5 minutes):</h4> <p>As you prepare for your psychedelic experience, it&#39;s important to create a network of people who can support you during your integration journey. This network doesn&#39;t need to include professionals, though it can if you choose. The most crucial aspect is having trusted individuals you can turn to for support and understanding.</p> <ol> <li>Start by identifying close friends or family members who are open to and supportive of your experience. Plan regular times to connect with them, like weekly walks or video calls, when you can openly discuss your thoughts and feelings.</li> <li>You might also want to explore community support options. Look for psychedelic integration circles or support groups, either in your local area or online. These groups can provide a space in which to share experiences with others who are on similar journeys.</li> <li>If you have access to and are interested in professional support, consider scheduling occasional sessions with a therapist who has experience with psychedelic integration. This is entirely optional but can be helpful for some people.</li> <li>Lastly, it&#39;s wise to <strong>designate an emergency contact</strong> – someone you can reach out to if you need immediate support at any point.</li> </ol> <p>Remember, the goal is to create a support system that feels right for you. Be open about your needs and plans with your chosen supporters, and make sure they&#39;re comfortable with their role in your integration process. Having this network in place will provide you with understanding, encouragement and a safety net as you navigate your journey.</p>`,
			module_id: 3,
		},
	]);
}
