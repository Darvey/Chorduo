// fonctions utiles pour l'affichage de notes

import Settings from "../../store/Settings"

export default {
	methods: {
		/**
		 * retourne la bonne classe css a ppliquer a une note en fonction de son interval
		 * @param interval
		 * @returns {string}
		 */
		getNoteClass(interval) {
			return 'is-color-'+Settings.state.dotsColor[ interval ];
		},

		/**
		 * retourne le vrai nom de l'interval a afficher
		 * @param interval
		 * @returns {string}
		 */
		getIntervalName(interval) {
			return interval === 0 ? 'R' : interval
		}
	}
}