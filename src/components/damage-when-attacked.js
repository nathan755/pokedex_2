import React, { Component } from "react";
import TypeBar from "./type-bar";
import Axios from "axios";

class DamageWhenAttacked extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typesData: [],
      loading: true,
    };

    this.renderDamageBars = this.renderDamageBars.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.types !== this.props.types) {
      const requests = [];

      this.props.types.forEach((type) => {
        requests.push(
          Axios.get(`https://pokeapi.co/api/v2/type/${type.type.name}`)
        );
      });

      Promise.all(requests).then((res) => {
        this.setState({
          typesData: res,
          loading: false,
        });
      });
    }
  }

  renderDamageBars() {
    if (!this.state.loading) {
      // Pokemon can have up to to types. Below values are type ones damage multipliers.
      const typeOneDoubleDamageValues = this.state.typesData[0].data.damage_relations.double_damage_from.map(
        (type) => ({ name: type.name, multiplier: "2x" })
      );
      const typeOneHalfDamageValues = this.state.typesData[0].data.damage_relations.half_damage_from.map(
        (type) => ({ name: type.name, multiplier: "0.5x" })
      );
      const typeOneNoDamageValues = this.state.typesData[0].data.damage_relations.no_damage_from.map(
        (type) => ({ name: type.name, multiplier: "0x" })
      );
      const types = [
        ...typeOneDoubleDamageValues,
        ...typeOneHalfDamageValues,
        ...typeOneNoDamageValues,
      ];

      if (this.state.typesData.length === 1) {
        return (
          <div className="damage-when-attacked__bars-container">
            <div className="flex-item">
              {types.map((type) => (
                <TypeBar
                  type={type.name}
                  multiplier={type.multiplier}
                  colour={"#" + this.props.colours[type.name]}
                />
              ))}
            </div>
          </div>
        );
      }

      if (this.state.typesData.length !== 1) {
        // If the pokemon has two types populate below arrays with their damage multipliers.
        let typeTwoDoubleDamageValues = this.state.typesData[1].data.damage_relations.double_damage_from.map(
          (type) => ({ name: type.name, multiplier: "2x" })
        );
        let typeTwoHalfDamageValues = this.state.typesData[1].data.damage_relations.half_damage_from.map(
          (type) => ({ name: type.name, multiplier: "0.5x" })
        );
        let typeTwoNoDamageValues = this.state.typesData[1].data.damage_relations.no_damage_from.map(
          (type) => ({ name: type.name, multiplier: "0x" })
        );
        let quadDamageValues = [];

        // If either type recieves no damage pokemon is immune.
        const filtered = typeOneNoDamageValues.filter(
          (type) => !typeTwoNoDamageValues.includes(type.name)
        );
        const noDamageValues = [...filtered, ...typeTwoNoDamageValues];
        // If type 1 and type 2 are both resistent i.e they receive only half damage, then the damage multiplier is 0.25.
        const quarterDamageValues = [];

        typeOneHalfDamageValues.forEach((type) => {
          const inBoth = typeTwoHalfDamageValues.some(
            (item) => item.name === type.name
          );

          if (inBoth) {
            quarterDamageValues.push({ name: type.name, multiplier: "0.25x" });

            const index = typeTwoHalfDamageValues
              .map((e) => e.name)
              .indexOf(type.name);

            typeTwoHalfDamageValues.splice(index, 1);
          }
        });

        typeOneDoubleDamageValues.forEach((type) => {
          const inBoth = typeTwoDoubleDamageValues.some(
            (item) => item.name === type.name
          );
          if (inBoth) {
            quadDamageValues.push({ name: type.name, multiplier: "4x" });

            const index = typeTwoDoubleDamageValues
              .map((e) => e.name)
              .indexOf(type.name);

            typeTwoDoubleDamageValues.splice(index, 1);
          }
        });

        const leftDamageMultipliers = [
          ...quadDamageValues,
          ...typeTwoDoubleDamageValues,
          ...typeTwoHalfDamageValues,
        ];

        const rightDamageMultipliers = [
          ...noDamageValues,
          ...quarterDamageValues,
        ];
        return (
          <div className="damage-when-attacked__bars-container">
            <div className="flex-item">
              {leftDamageMultipliers.map((type) => (
                <TypeBar
                  type={type.name}
                  multiplier={type.multiplier}
                  colour={"#" + this.props.colours[type.name]}
                />
              ))}
            </div>
            <div className="flex-item">
              {rightDamageMultipliers.map((type) => (
                <TypeBar
                  type={type.name}
                  multiplier={type.multiplier}
                  colour={"#" + this.props.colours[type.name]}
                />
              ))}
            </div>
          </div>
        );
      }
    }

    return null;
  }

  render() {
    return (
      <div className="damage-when-attacked">
        <this.renderDamageBars />
      </div>
    );
  }
}

export default DamageWhenAttacked;
