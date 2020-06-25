import { shallowMount } from "@vue/test-utils";
import CrowdingComponent from "@/components/crowdingComponent.vue";

describe("CrowdingComponent", () => {
  describe("Methods", () => {
    const documentSpy = jest.spyOn(document, "getElementById");
    const consoleSpy = jest.spyOn(console, "log");

    test("searchLocation should return the search location and set haveSearched to true", () => {
      const data = {
        hasSearched: false,
        selectedTime: 0,
        selectedLocation: "391 Amsterdam Ave",
        time: null
      };

      const wrapper = shallowMount(CrowdingComponent, {
        propsData: data
      });

      documentSpy.mockReturnValueOnce({ value: "someValueForLocation" });
      wrapper.vm.searchLocation();
      expect(data.selectedLocation).toMatchInlineSnapshot(
        `"391 Amsterdam Ave"`
      );
      expect(consoleSpy).toBeCalled();
      expect(consoleSpy).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": Array [
            Array [
              "searched: ",
              "someValueForLocation",
              " at ",
              "1:00 AM",
            ],
          ],
          "results": Array [
            Object {
              "type": "return",
              "value": undefined,
            },
          ],
        }
      `);
      expect(wrapper.vm.$data.haveSearched).toBe(true);
    });
  });

  test("returns correctly", () => {
    const wrapper = shallowMount(CrowdingComponent, {
      propsData: { busyResults: new Object(), hasSearched: false }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="crowding-data">
        <div style="display: none;">
          <chart-stub crowdingdata="[object Object]" style="display: none;"></chart-stub>
        </div>
      </div>
    `);
  });
});